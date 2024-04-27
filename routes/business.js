const express = require("express");
const router = express.Router();

const {
  loginBusiness,
  registerBusiness,
  dashboard,
  getAllBusinesses,
  updateBusinessPoints,
  forgetPasswordBusiness,
  resetPasswordBusiness,
} = require("../controllers/business");

const authMiddleware = require("../middleware/authBusiness");

router.route("/loginBusiness").post(loginBusiness);
router.route("/registerBusiness").post(registerBusiness);
router.route("/businessDashboard").get(authMiddleware, dashboard);
router.route("/getAllBusinesses").get(getAllBusinesses);
router.route("/updateBusinessPoints").put(updateBusinessPoints);
router.route("/forgetPasswordBusiness").post(forgetPasswordBusiness);
router.route("/resetPasswordBusiness").post(resetPasswordBusiness);
module.exports = router;
