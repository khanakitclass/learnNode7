const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema(
    {
        category_id: {
            type: Number,
            required: true
        },
        subcategory_id: {
            type: Number,
            required: true
        },
        variant_id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        isActive : {
            type: Boolean,
            default: true
        }
    },
    {
        timestemps: true,
    }
)

const products = mongooes.model("products", productsSchema);
module.exports = products;