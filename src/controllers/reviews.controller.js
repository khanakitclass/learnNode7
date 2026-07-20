const pool = require("../db/mySQL");

const getAllReviews = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM reviews");

    console.log("result => getAllReviews : ", result);

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

const addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const [result] = await pool.query(
      "INSERT INTO reviews(rating, reviews) VALUES(?, ?)",
      [rating, review],
    );

    console.log(result);

    res.status(200).json({
      success: true,
      data: { ...req.body, id: result.insertId },
      message: "Review add successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error " + error.message,
    });
  }
};

const editReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { reviews, rating } = req.body;
    console.log("ididididid", id);

    const [result] = await pool.query(
      "UPDATE reviews SET reviews=?,rating=? WHERE id=?",
      [reviews, rating, id],
    );

    if (!result?.affectedRows) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Review not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "review updated",
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

const statusReview = async (req, res) => {
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

// const editReview = async (req, res) => {
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

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM reviews WHERE id=?", [id]);

    console.log("resultresultresult delete1111", result);

    if (!result?.affectedRows) {
      return res.status(400).json({
        success: true,
        data: null,
        message: "Review not Deleted Susscessfull",
      });
    }

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
// const deleteReview = async (req, res) => {
//   try {
//     const id = req.params.id

//     const [result] = await pool.query(
//       "DELETE FROM reviews WHERE id=?",
//       [id]
//     )

//     if (!result.affectedRows) {
//       return res.status(400).json({success: false, data: {}, message: "Review not deleted"});
//     }

//     res.status(200).json({
//       success: true,
//       data: null,
//       message: "Review Deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Internal server error " + error.message,
//     });
//   }
// }

module.exports = {
  getAllReviews,
  addReview,
  editReview,
  deleteReview,
  statusReview
};


//accessToken   refreshToken    Authentication   diffrence