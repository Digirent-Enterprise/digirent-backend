const router = require("express");

const googleOauthHandler = require("../../controllers/google.controller");

router.get("/", googleOauthHandler);

module.exports = router;
