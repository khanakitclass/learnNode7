const nodemailer = require("nodemailer");

const sendEmail = (to, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: to,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("nodemailer error " + error.message);
  }
};

module.exports = sendEmail
