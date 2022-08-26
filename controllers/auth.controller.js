const catchAsync = require("../utils/catchAsync");
const {
  AuthService,
  UserService,
  TokenService,
  EmailService,
} = require("../services");
const bcrypt = require("bcryptjs");

const register = catchAsync(async (req, res) => {
  const { email, pw1, pw2, phone, name } = req.body;
  if (!(email && pw1 && pw2 && phone)) {
    res.status(400).send("All input is required");
  }

  const user = await AuthService.findUser(email);
  if (user) {
    return res.status(400).send("User Already Exist");
  }

  if (pw1.toLowerCase() !== pw2.toLowerCase()) {
    return res.status(400).send("Password doest not match");
  }
  const encryptedPassword = await AuthService.encryptPassword(pw1);
  const currentDate = new Date().toLocaleDateString();
  await UserService.createUser(
    name,
    email,
    encryptedPassword,
    "user",
    true,
    "Ho Chi Minh city",
    "",
    "",
    phone,
    currentDate,
  );

  return res.sendStatus(201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const found = await AuthService.findUser(email);
  if (found) {
    if (found.status === false)
      return res.status(401).send("Account has been deactivated.");
    if (await bcrypt.compare(password, found.password)) {
      const response = await AuthService.loginUserWithEmailAndPassword(found);
      return res.status(200).json(response);
    }
  }
  return res.sendStatus(401);
});

const logout = catchAsync(async (req, res) => {
  const { email } = req.user;
  const user = await AuthService.logout(email);
  if (!user)
    return res.status(404).send("Something's wrong.cannot logout this user!");
  return res
    .status(200)
    .send("logout successfully. Refresh token has been revoked.");
});

const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  const found = await AuthService.findUserByToken(refreshToken);
  if (!found) return res.sendStatus(401);
  const newAccessToken = await TokenService.verifyToken(refreshToken);
  if (!newAccessToken) {
    return res.send(403);
  }
  return res.json(newAccessToken);
});

const requestForgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).send("Email cannot be empty");
  }
  const found = await UserService.findUserByEmail(email);
  if (!found) return res.status(404).send("User not found");
  const forgetPasswordToken = await TokenService.generateForgotPasswordToken(
    email,
  );

  await EmailService.sendEmail(email, forgetPasswordToken);
  return res.status(200).send(`An email has been sent to ${email}`);
};

const verifyForgotPasswordRequest = catchAsync(async (req, res) => {
  const { email } = req;
  if (email) return res.status(200).json({ email });
  return res.sendStatus(401);
});

const resetForgottenPassword = catchAsync(async (req, res) => {
  const { email } = req;
  const { newPassword } = req.body;
  const encodedPassword = await AuthService.encryptPassword(newPassword);
  const response = await AuthService.changeUserPassword(email, encodedPassword);
  if (response) return res.status(200).json(response);
  return res.sendStatus(404);
});

const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  if (!email) return res.sendStatus(404);
  const { currentPassword, newPassword } = req.body;
  const found = await AuthService.findUser(email);
  if (!found) return res.sendStatus(404);
  if (await bcrypt.compare(currentPassword, found.password)) {
    const encodedPassword = await AuthService.encryptPassword(newPassword);
    console.log("encodedPassword", encodedPassword);
    const response = await AuthService.changeUserPassword(
      email,
      encodedPassword,
    );
    return res.status(200).json(response);
  }
  return res.status(401).send("Password is not correct");
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
  requestForgetPassword,
  verifyForgotPasswordRequest,
  resetForgottenPassword,
};
