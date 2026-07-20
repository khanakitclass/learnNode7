const { Terms } = require("../../models/index.js");
const pool = require("../db/mySQL");
const { Op } = require("sequelize");

const getAllTerms = async (req, res) => {
  try {
    // const [result] = await pool.query("SELECT * FROM reviews");

    // const result = await Terms.findAll({
    //   attributes: ["id", "name"],
    //   where: {
    //     name: "uyjyu",
    //     id: 4
    //   }
    // });

    // const result = await Terms.findAll({
    //   attributes: ["id", "name"],
    //   where: {
    //     [Op.or] : {
    //       name: "uyjyu",
    //       id: 4
    //     }
    //   }
    // });

    // const result = await Terms.findAll({
    //   attributes: ["id", "name"],
    //   where: {

    //     name: {
    //       [Op.like] : '%u%'   //_
    //     }

    //   }
    // });

    //  const result = await Terms.findAll({
    //   attributes: ["id", "name"],
    //   where: {

    //     id: {
    //       [Op.gt]: 1,
    //       [Op.lt]: 3
    //     }

    //   }
    // });

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // console.log("result => getAllReviews : ", page, limit);

    const result = await Terms.findAll({
      attributes: ["id", "name"],
      limit: limit,
      offset: (page - 1) * limit,
    }, {rows: false});



    res.status(200).json({
      message: "",
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

const addTerms = async (req, res) => {
  try {
    console.log(req.body);

    const result = await Terms.create(req.body);

    res.status(200).json({
      success: true,
      data: result,
      message: "Terms add successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

const editTerms = async (req, res) => {
  try {
    const { name, description } = req.body;

    const id = req.params.id;

    const term = await Terms.update(
      {
        name: name,
        description: description,
      },
      {
        where: {
          id: id,
        },
      },
    );

    // const term = await Terms.findByPk(id);

    // if (!term) {
    //   return res.status(400).json({
    //   success: false,
    //   data: null,
    //   message: "Terms not found",
    // });
    // }

    // await term.update({
    //   name,
    //   description
    // })

    // term.name = name;
    // term.description = description;

    // await term.save();

    // const { reviews, rating } = req.body;
    // console.log("ididididid", id);

    // const [result] = await pool.query(
    //   "UPDATE reviews SET reviews=?,rating=? WHERE id=?",
    //   [reviews, rating, id],
    // );

    // if (!result?.affectedRows) {
    //   return res.status(400).json({
    //     success: false,
    //     data: null,
    //     message: "Review not updated",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "terms updated",
      data: term,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error " + error?.message,
    });
  }
};

const statusTerms = async (req, res) => {
  try {
    const id = req.params.id;

    const { status } = req.body;

    const [result] = await pool.query(
      "UPDATE reviews SET active=? WHERE id=?",
      [status, id],
    );

    if (!result?.affectedRows) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Status of review not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status of review updated",
      data: { ...req.body, id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error " + error?.message,
    });
  }
};

// const editTerms = async (req, res) => {
//   try {
//     console.log("req @@@@@@@@@", req.params.id);

//     const id = req.params.id;

//     const { rating, review } = req.body;

//     const [result] = await pool.query(
//       "UPDATE reviews SET rating=?, reviews=? WHERE id=?",
//       [rating, review, id],
//     );

//     console.log("result", result);

//     if (!result.affectedRows) {
//       return res.status(400).json({success: false, data: {}, message: "Review not Updated"});
//     }

//     res.status(200).json({
//       success: true,
//       data: { ...req.body, id },
//       message: "Review Updated",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Internal server error " + error.message,
//     });
//   }
// };

const deleteTerms = async (req, res) => {
  try {
    const id = req.params.id;

    // const result = await Terms.findByPk(id);

    // result.destroy();

    // const result = await Terms.destroy({
    //   where: {
    //     id: id
    //   }
    // })

    // const [result] = await pool.query("DELETE FROM reviews WHERE id=?", [id]);

    // console.log("resultresultresult delete1111", result);

    // if (!result?.affectedRows) {
    //   return res.status(400).json({
    //     success: true,
    //     data: null,
    //     message: "Review not Deleted Susscessfull",
    //   });
    // }

    res.status(200).json({
      success: true,
      data: null,
      message: "Review Deleted Susscessfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal servar error " + error?.message,
    });
  }
};

module.exports = {
  getAllTerms,
  addTerms,
  editTerms,
  deleteTerms,
  statusTerms,
};

//accessToken   refreshToken    Authentication   diffrence
