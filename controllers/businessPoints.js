const jwt = require("jsonwebtoken");
const Business = require("../models/businessPoints");





const getAllPointsDetails = async (req, res) => {
  let businessPoints = await Business.find({});
  return res.status(200).json({ businessPoints });
};

const getBusinessPointsDetails = async (req, res) => {
  const  businessId = req.business.businessId;
  let businessPoints = await Business.find({businessId});

  return res.status(200).json({ businessPoints });
};

const addBusinessPoints = async (req, res) => {
  
  // let foundBusiness = await Business.findOne({ businessId: req.business.businessId });
  // if (foundBusiness === null) {
    // const  businessId = req.business.businessId;
    let { rewardName, rewardDollar,redeemLimit, businessId, dollarPer100} = req.body;
    
    
    if (rewardName.length  && businessId) {
      const business = new Business({
        businessId: businessId,
        rewardName: rewardName,
        rewardDollar: parseFloat(rewardDollar),
        redeemLimit: parseFloat(redeemLimit),
        dollarPer100: parseFloat(dollarPer100)
      });
     
      await business.save();
     return res.status(201).json({ business });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  // } else {
  //   return res.status(400).json({ msg: "business points already exist" });
  // }
};

const updateBusinessPointsDetails = async (req, res) => {
  // const businessId = req.business.businessId;
  // let foundBusiness = await Business.findOne({ businessId: req.business.businessId });
  // if (foundBusiness !== null) {
    let { rewardName, rewardDollar,redeemLimit, businessId, dollarPer100} = req.body;
    // console.log(businessId);
    if (rewardName.length && rewardDollar.length && redeemLimit.length) {
      const business = new Business({
        rewardName: rewardName,
        rewardDollar: rewardDollar,
        redeemLimit: redeemLimit,
        dollarPer100: dollarPer100
      });
      await Business.updateOne({businessId: businessId}, {$set: {rewardName: rewardName,rewardDollar: rewardDollar,redeemLimit: redeemLimit,dollarPer100: dollarPer100}});
      return res.status(201).json({ business });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  // } else {
    // return res.status(400).json({ msg: "Business Does not exist" });
  // }
};

module.exports = {
 
  addBusinessPoints,
  getBusinessPointsDetails,
  updateBusinessPointsDetails
};
