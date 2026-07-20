const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartsSchema = new Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        items: [
            {
                product_id: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ]
    },
    {
        timestamps: true,
    }
)

const carts = mongoose.model("carts", cartsSchema);
module.exports = carts;