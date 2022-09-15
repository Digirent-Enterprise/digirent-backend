const express = require("express");
const { userController } = require("../../controllers");
const {
  authenticateAdmin,
  authenticateToken,
} = require("../../middlewares/auth");
const router = express.Router();

router.post("/delete-user", authenticateAdmin, (req, res) =>
  userController.deleteUser(req, res),
);
router.put("/change-status", authenticateToken, (req, res) =>
  userController.changeUserStatus(req, res),
);
router.get("/user-detail", authenticateToken, (req, res) =>
  userController.getUserDetail(req, res),
);
router.get("/users", authenticateAdmin, (req, res) =>
  userController.getUsers(req, res),
);

router.put("/edit-user", authenticateToken, (req, res) =>
  userController.updateUser(req, res),
);

router.put("/admin-edit-user", authenticateAdmin, (req, res) =>
  userController.adminUpdateUser(req, res),
);

module.exports = router;
