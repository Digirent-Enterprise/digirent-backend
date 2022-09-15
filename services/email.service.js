const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { forgetPasswordContent } = require("../constant/email-content");

// const OAuth2 = google.auth.OAuth2;
// const OAuth2Client = new OAuth2(
//   process.env.GOOGLE_API_CLIENT_ID,
//   process.env.GOOGLE_API_CLIENT_SECRET,
//   "",
//   "",
//   1,
//   false,
//   () => {}
// );
// // OAuth2Client.setCredentials({
//   refresh_token: "",
// });

const sendEmail = async (receiver, token) => {
  let accessToken = "";
  // await OAuth2Client.getAccessToken()
  // accessToken = await OAuth2Client.getAccessToken().catch(async (e) => {
  //   if (e) {
  //     const refresh = await OAuth2Client.refreshAccessToken();
  //     accessToken = OAuth2Client.getAccessToken();
  //   }
  // });
  // const transport = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.MAIL_USER,
  //     clientId: process.env.GOOGLE_API_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
  //     refreshToken: process.env.GOOGLE_API_CLIENT_REFRESH_TOKEN,
  //     accessToken,
  //   },
  // });
  //
  const link = `https://www.digirent.dev/reset-password/${token}`;
  //
  const transport = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.APP_PASSWORD
    },
    port: 465,
    host: "smtp.gmail.com"
  })

  const mailOptions = {
    from: `RMIT DIGIRENT ADMIN ${process.env.MAIL_USER}`,
    to: receiver,
    subject: "Reset password request at RMIT Digirent",
    text: forgetPasswordContent(receiver, link),
  };

  transport.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log("Error when sent email ", err);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
};

module.exports = {
  sendEmail,
};
