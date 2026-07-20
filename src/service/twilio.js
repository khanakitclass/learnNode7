

const sendOTP = (to, otp) => {
  try {
    console.log(to, otp);
    
    const accountSid = process.env.TWILIO_ASID;
    const authToken = process.env.TWILIO_AUTH;
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: `Your verification OTP is: ${otp}`,
        messagingServiceSid: process.env.TWILIO_MSID,
        to: to,
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    console.log(error.message);
    
  }
};

module.exports = sendOTP;
