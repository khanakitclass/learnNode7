const { Products, Terms, Tags } = require("../../models/index.js");

const addProducts = async (req, res) => {
  try {
    console.log(req.body);

    const result = await Products.create(req.body)

    res.status(200).json({
      success: true,
      data: result,
      message: "Products add successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {

    // });

    const result = await Products.findAll({
        include: {
            model: Terms,
            as: "termsInfo"
        }
    });





    res.status(200).json({
      message: "get all products",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

const assignTagToProduct = async (req, res) => {
  try {
    const {tag_id, product_id} = req.body;

    const product = await Products.findByPk(product_id);
    const tag = await Tags.findByPk(tag_id);

    if (!product || !tag) {
      return res.status(400).json({
        success: false,
        message: "Product or Tag not found",
        data: null
      })
    }

    const data = await product.addTagInfo(tag);

    console.log(data);
    
    res.status(200).json({
        success: true,
        message: "Tag assign to product",
        data: data
      })

  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
}

const getAllProductTag = async (req, res) => {
  try {
    const { product_id, tag_id } = req.body;

    const product = await Products.findByPk(product_id);
    const tag = await Tags.findByPk(tag_id);

    if (!product || !tag) {
      return res.status(400).json({
        success: false,
        message: "Product or Tag not found",
        data: null
      })
    }

    const data = await product.removeTagInfo(tag);

    res.status(200).json({
        success: true,
        message: "All product's tag",
        data: data
      })

  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
}

module.exports = {
    addProducts,
    getAllProducts,
    assignTagToProduct,
    getAllProductTag
}