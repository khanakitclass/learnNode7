const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const  Orders  = require("../models/order.model");
const  Payments  = require("../models/payment.model");

const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, user_id } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    console.log(order, "fffff");
    

    const orderData = await Orders.create({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
      user_id: user_id,
    });

    res.status(200).json({
      success: true,
      data: orderData,
      message: "Order created",
    }); // Send order details to frontend, including order ID
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret,
    );
    if (isValidSignature) {
      // Update the order with payment details

      const order = await Orders.findOne({ order_id: razorpay_order_id });

      order.status = "paid";
      order.payment_id = razorpay_payment_id;

      await order.save();

      const payment = await Payments.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json({
        success: true,
        data: order,
        message: "Payment successfull.",
      });
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
