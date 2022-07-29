const {
  getGoogleOAuthTokens,
  getGoogleUser,
} = require("../services/google.service");

const { findAndUpdateUser } = require("../services/user.service");

const googleOauthHandler = async (req, res) => {
  // get the code from qs
  const code = req.query.code;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    console.log("token", { id_token, access_token });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });
    //jwt.decode(id_token);

    console.log("google", { googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    // upsert the user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      },
    );

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token

    const accessToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES },
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS },
    );

    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    return res.redirect(`${process.env.CLIENT_URL}/oauth/error`);
  }
};

module.exports = googleOauthHandler;
