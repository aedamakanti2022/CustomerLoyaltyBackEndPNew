const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  forgetPassword,
  resetPassword,
} = require("../controllers/user");

const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);

module.exports = router;
