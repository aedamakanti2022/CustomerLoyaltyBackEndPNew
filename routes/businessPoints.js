const express = require("express");
const router = express.Router();

const { addBusinessPoints, getBusinessPointsDetails, updateBusinessPointsDetails} = require("../controllers/businessPoints");

const authMiddleware = require('../middleware/authBusiness')

router.route("/addBusinessPoints").post(addBusinessPoints);
router.route("/getBusinessPointsDetails").post(getBusinessPointsDetails);
router.route("/updateBusinessPointsDetails").put(updateBusinessPointsDetails);
module.exports = router;