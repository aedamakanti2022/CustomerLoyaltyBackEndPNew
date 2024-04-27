const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    businessId: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 1,
        maxlength: 50
    },
   

    rewardName: {
        type: String,
        required: [false, 'Please provide name'],
        minlength: 1,
        maxlength: 50
    },

    rewardDollar: {
        type: Number ,
        required: [false, 'Please provide name'],
        minlength: 1,
        maxlength: 50
    },

    redeemLimit: {
        type: Number ,
        required: [false, 'Please provide name'],
        minlength: 1,
        maxlength: 50
    },

    dollarPer100: {
        type: Number ,
        required: [false, 'Please provide name'],
        minlength: 1,
        maxlength: 50
    },
   
});







module.exports = mongoose.model("businessPoints", UserSchema);