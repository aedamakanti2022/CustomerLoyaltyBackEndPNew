const express = require("express");
const router = express.Router();

const {
  addPoints,
  getAllCustomerPoints,
  customerPoints,
  updatePoints,
  updateCusPoints,
  businessPoints,
} = require("../controllers/customerPoints");
const authMiddleware = require("../middleware/auth");
const authBusinessMiddleware = require("../middleware/authBusiness");
router.route("/addPoints").post(addPoints);
router.route("/getAllCustomerPoints").get(getAllCustomerPoints);
router.route("/customerPoints").get(authMiddleware, customerPoints);
router.route("/businessPoints").get(authBusinessMiddleware, businessPoints);
router.route("/updatePoints").put(updatePoints);
router.route("/updateCusPoints").put(updateCusPoints);
module.exports = router;
