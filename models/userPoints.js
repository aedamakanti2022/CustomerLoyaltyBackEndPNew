const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },
  businessId: {
    type: String,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },
  businessName: {
    type: String,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },

  amountPurchased: {
    type: Number,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },

  reward: {
    type: Number,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },
  rewardDollar: {
    type: Number,
    required: [true],
    minlength: 1,
    maxlength: 50,
  },

  redeemLimit: {
    type: Number,
    required: [true],
    minlength: 3,
    maxlength: 50,
  },
  dollarPer100: {
    type: Number,
    required: [false, "Please provide name"],
    minlength: 1,
    maxlength: 50,
  },

  redeemHistory: [
    {
      customerName: String,
      redeemedPoints: Number,
      dollar: Number,
    },
  ],
});

// UserSchema.pre("save", async function(){
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })

// UserSchema.methods.comparePassword = async function(candidatePassword){
//     const isMatch = await bcrypt.compare(candidatePassword, this.password);
//     return isMatch;
// }

module.exports = mongoose.model("userPoints", UserSchema);
