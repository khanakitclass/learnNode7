const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    payment_id: {
      type: String,
    },
    order_id: {
      type: String,
      required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Orders = mongoose.model("orders", ordersSchema);
module.exports = Orders;
