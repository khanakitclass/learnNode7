const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        category_img: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Categories = mongoose.model("categories", categoriesSchema);
module.exports = Categories;