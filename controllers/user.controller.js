const { UserService } = require("../services");

const deleteUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.sendStatus(404);
  const user = UserService.deleteUser(email);
  if (!user) return res.sendStatus(403);
  return res.status(200).send(user);
};

const getUserDetail = async (req, res) => {
  const { user } = req;
  if (user) {
    const found = await UserService.findUserByEmail(user.email);
    if (!found) return res.sendStatus(404);
    return res.json(found);
  }
  return res.sendStatus(403);
};

const changeUserStatus = async (req, res) => {
  const update = {
    status: req.body.status,
  };
  const id = req.user.user_id;

  const updatedStatusUser = await UserService.findAndUpdateUser(id, update, {
    new: true,
  }).catch((error) => {
    return res.status(500).send(error);
  });

  return res.status(200).send(updatedStatusUser);
};

const getUsers = async (req, res) => {
  const users = await UserService.getAllUser();
  if (!users) return res.sendStatus(404);
  return res.status(200).json(users);
};

const updateUser = async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const { user_id } = req.user;
  const updated = await UserService.updateUser(user_id, req.body);
  if (!updated)
    return res.status(501).send("Some fields are missing or user not found");
  return res.json(updated);
};

const adminUpdateUser = async (req, res) => {
  const { id } = req.body;
  const updated = await UserService.adminUpdateUser(id, req.body);
  if (!updated)
    return res.status(501).send("Some fields are missing or user not found");
  return res.json(updated);
};

module.exports = {
  deleteUser,
  getUserDetail,
  getUsers,
  changeUserStatus,
  updateUser,
  adminUpdateUser,
};
