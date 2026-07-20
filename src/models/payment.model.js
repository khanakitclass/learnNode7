const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentsSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payments = mongoose.model("payments", paymentsSchema);
module.exports = Payments;
