const  pool  = require("../db/mySql1");
const Categories = require("../models/category.model");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.find();



    if (!categories) {
      res.status(400).json({
        success: false,
        data: [],
        message: "All categories not found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      message: "All categories data fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Internal servar error" + error.message,
    });
  }
  console.log("Hello");
};

const getAllActiveCategory = async (req, res) => {
  try {
    const categories = await Categories.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
    ]);

    if (!categories) {
      res.status(400).json({
        success: false,
        data: [],
        message: "Active categories not found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      message: "Active categories data fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Internal servar error" + error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const categories = await Categories.findById(_id);

    if (!categories) {
      res.status(400).json({
        success: false,
        data: null,
        message: "Categories not found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      message: "Categories data fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error" + error.message,
    });
  }
  console.log("Hello");
};

const addCategory = async (req, res) => {
  try {
    console.log("user data: ", req?.file);

    const {name, description} = req.body;
    
    console.log(name, description);
    
    // const date2 = await Categories.create({...req.body, createdBy: req.user?._id});

    let query = ''

    if (req?.file) {
      query = 'INSERT INTO categories(name, description, category_img) VALUES(?, ?, ?)'
    } else {
      query = 'INSERT INTO categories(name, description) VALUES(?, ?)'
    }
    const [date2] = await pool.query(query, [name, description, req?.file?.path])

    console.log(date2);
    

    if (!date2) {
      return res.status(400).json({
        message: "not added",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "added",
      success: false,
      data: {...req.body, id: date2.insertId, category_img: req?.file?.path},
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "internal servar error" + error.message,
      success: true,
      data: null,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Categories.findByIdAndUpdate(_id, req?.body, {
      new: true,
    });

    if (!category) {
      res.status(400).json({
        success: false,
        data: null,
        message: "Category not updated",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category data updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error" + error.message,
    });
  }
  console.log("Hello");
};
const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;

    //fs.unlink

    const category = await Categories.findByIdAndDelete(_id);

    if (!category) {
      res.status(400).json({
        success: false,
        data: null,
        message: "Category not deleted",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category data deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error" + error.message,
    });
  }
  console.log("Hello");
};

module.exports = {
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllActiveCategory,
};
