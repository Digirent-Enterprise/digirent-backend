const qs = require("qs");
const axios = require("axios");

const getGoogleOAuthTokens = async (code) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res =
      (await axios.post) <
      GoogleTokensResult >
      (url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    return res.data;
  } catch (error) {
    console.error(error.response.data.error);
    log.error(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
};

const getGoogleUser = async (id_token, access_token) => {
  try {
    const res =
      (await axios.get) <
      GoogleUserResult >
      (`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });
    return res.data;
  } catch (error) {
    log.error(error, "Error fetching Google user");
    throw new Error(error.message);
  }
};

module.exports = { getGoogleOAuthTokens, getGoogleUser };
