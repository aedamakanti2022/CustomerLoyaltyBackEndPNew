const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendMail } = require("../utils/sendMail");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          name: foundUser.name,
          customerId: foundUser.customerId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res
        .status(400)
        .json({ msg: "Please enter valid credentials and try again!" });
    }
  } else {
    return res.status(400).json({
      msg: "User not found! Please make sure you are login to correct dashboard!",
    });
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  let customerId = req.user.customerId;
  let userData = await User.find({ customerId });
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    customerId: req.user.customerId,
    userData: userData,
  });
};

const userData = async (req, res) => {
  let customerId = req.user.customerId;
  let userData = await User.find({ customerId });
  res.status(200).json({
    userData,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password, customerId } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        customerId: customerId,
        name: username,
        email: email,

        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res
        .status(400)
        .json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let foundUser = await User.findOne({ email: req.body.email });

    if (!email) {
      return res.status(400).json({
        msg: "Bad request. Please add email in the request body",
      });
    }
    if (!foundUser) {
      return res.status(400).json({
        msg: "No user found with this email!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendMail(req.body.email, otp);
    await User.updateOne({ email: req.body.email }, { otp });
    return res.status(200).json({
      msg: "OTP sent successfully on your email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Server Error! Please try again later!",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email, otp } = req.body;
    let foundUser = await User.findOne({ email, otp });

    if (!email) {
      return res.status(400).json({
        msg: "Bad request. Please add email in the request body",
      });
    }
    if (!foundUser) {
      return res.status(400).json({
        msg: "No user found with this email or the otp is incorrect!",
      });
    }

    await User.updateOne({ email: req.body.email }, { password, otp: "" });
    return res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Server Error! Please try again later!",
    });
  }
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  forgetPassword,
  resetPassword,
};
