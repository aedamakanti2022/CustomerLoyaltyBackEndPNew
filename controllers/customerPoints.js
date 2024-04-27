const jwt = require("jsonwebtoken");
const cPoints = require("../models/userPoints");
const User = require("../models/User");

const businessPoints = async (req, res) => {
  let businessId = req.business.businessId;
  let cusPoints = await cPoints.find({
    businessId,
  });
  res.status(200).json({
    cusPoints,
  });
};

const customerPoints = async (req, res) => {
  let customerId = req.user.customerId;
  let cusPoints = await cPoints.find({ customerId });
  res.status(200).json({
    cusPoints,
  });
};

const getAllCustomerPoints = async (req, res) => {
  let points = await userPoints.find({});

  return res.status(200).json({ points });
};

const addPoints = async (req, res) => {
  let {
    customerId,
    businessId,
    reward,
    redeemLimit,
    amountPurchased,
    businessName,
    rewardDollar,
    dollarPer100,
  } = req.body;

  const CustomerPoints = new cPoints({
    customerId: customerId,
    businessId: businessId,
    reward: reward,
    amountPurchased: amountPurchased,
    redeemLimit: redeemLimit,
    businessName: businessName,
    rewardDollar: rewardDollar,
    dollarPer100: dollarPer100,
  });

  let pointsExist = await cPoints.findOne({
    customerId: customerId,
    businessId: businessId,
  });
  console.log(pointsExist);
  if (pointsExist !== null) {
    let originalreward = pointsExist.reward;
    updateCusPoints(CustomerPoints, originalreward);
  } else {
    await CustomerPoints.save();
  }
  // await customerPoints.save();
  return res.status(201).json({ CustomerPoints });
};

const updateCusPoints = async (CustomerPoints, originalreward) => {
  console.log("original reward: " + originalreward);
  let origReward = originalreward;
  let customerId = CustomerPoints.customerId;
  let businessId = CustomerPoints.businessId;
  let reward = CustomerPoints.reward;
  let redeemLimit = CustomerPoints.redeemLimit;
  let amountPurchased = CustomerPoints.amountPurchased;
  let businessName = CustomerPoints.businessName;
  let rewardDollar = CustomerPoints.rewardDollar;
  let dollarPer100 = CustomerPoints.dollarPer100;

  try {
    let updatedCustomerPoints = await cPoints.findOneAndUpdate(
      { customerId: customerId, businessId: businessId },
      {
        customerId: customerId,
        businessId: businessId,
        reward: reward + origReward,
        amountPurchased: amountPurchased,
        redeemLimit: redeemLimit,
        businessName: businessName,
        rewardDollar: rewardDollar,
        dollarPer100: dollarPer100,
      },
      { new: true, upsert: true }
    );

    // return res.status(201).json({ updatedCustomerPoints });
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const updatePoints = async (req, res) => {

//   let {  businessId,redeemedPoints } = req.body;

//   const CustomerPoints = new cPoints({

//     reward: redeemedPoints ,

//   });
//   console.log(CustomerPoints);
//   let foundP = await cPoints.findOne({ businessId: businessId });
//   // console.log(foundP._id);
//   await cPoints.updateOne({_id: foundP._id}, {$set: { CustomerPoints }});
//   return res.status(201).json({ CustomerPoints });

// };

const updatePoints = async (req, res) => {
  let { businessId, redeemedPoints, customerId } = req.body;

  try {
    let foundP = await cPoints.findOne({
      businessId: businessId,
      customerId: customerId,
    });
    if (!foundP) {
      return res.status(404).json({ error: "Customer points not found" });
    }
    let customer = await User.findOne({ customerId });

    await cPoints.updateOne(
      { _id: foundP._id },
      { $set: { reward: redeemedPoints } }
    );

    await cPoints.updateOne(
      { _id: foundP._id },
      {
        $push: {
          redeemHistory: {
            customerName: customer.name,
            redeemedPoints,
            dollar: (Number(redeemedPoints) * foundP.dollarPer100) / 100,
          },
        },
      }
    );
    const updatedCustomerPoints = await cPoints.findOne({ _id: foundP._id });

    return res.status(201).json({ updatedCustomerPoints });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addPoints,
  getAllCustomerPoints,
  customerPoints,
  updatePoints,
  updateCusPoints,
  businessPoints,
};
