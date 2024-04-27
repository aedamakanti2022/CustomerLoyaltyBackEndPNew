// create a sendMail helper function that will send an email to the user with the otp.
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: to,
    subject: "Forget Password OTP",
    text: `Your OTP is ${otp}`,
  };

  const res = await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
