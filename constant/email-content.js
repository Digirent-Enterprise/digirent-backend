module.exports = {
  forgetPasswordContent: (receiver, resetPasswordToken) =>
    `Hello ${receiver},\nPlease click this link ${resetPasswordToken} \n to reset your password at RMIT Digirent. So sorry because of this inconvenience.\nNote: The link will be expired within 5 minutes from now!\nSicerely,\nRMIT Digirent Customer Service Team.`,
};
