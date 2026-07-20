const Users = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../service/nodemailer");
const jwt = require("jsonwebtoken");
const createPDF = require("../service/pdfMake");

const fs = require("fs");
const path = require("path");
const sendOTP = require("../service/twilio");

const generateTokens = async (_id) => {
  try {
    const user = await Users.findById(_id);

    const accessToken = await jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = await jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" },
    );

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, mobile_no } = req.body;

    const user = await Users.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "User already exists.",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000);

    // sendEmail(
    //   "lakanidharmikmarn@gmail.com",
    //   "Registration OTP",
    //   `Your OTP is: ${otp}`,
    // );

    await sendOTP(mobile_no, otp);

    const userData = await Users.create({
      ...req.body,
      password: hashPass,
      otp,
    });

    if (!userData) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "User registration failed. Try again.",
      });
    }

    const userD = await Users.findOne({ email }).select("-password");

    // const docDef = {
    //   content: [
    //     { text: "Email: " + email },
    //     {
    //       table: {
    //         body: [
    //           ["Email", "Password", "Id"],
    //           [email, password, new String(userD?._id)],
    //         ],
    //       },
    //     },
    //   ],
    // };

    const imagePath = path.join(__dirname, "../../public/logo.png");

    const imageBase64 = fs.readFileSync(imagePath, {
      encoding: "base64",
    });

    const finalImage = `data:image/png;base64,${imageBase64}`;

    const docDefinition = {
      content: [
        {
          image: finalImage,
          width: 200,
          alignment: "center",
          margin: [0, 0, 0, 30],
        },

        {
          text: "Invoice",
          alignment: "center",
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 30],
        },

        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],

            body: [
              [
                { text: "Sr No", bold: true },
                { text: "Product", bold: true },
                { text: "Price", bold: true },
                { text: "Quantity", bold: true },
                { text: "Total Price", bold: true },
              ],

              ["1", "Mobile", "10000", "1", "10000"],
            ],
          },
        },
      ],
    };

    createPDF(docDefinition, `register_${userD?._id}.pdf`);

    res.status(200).json({
      success: true,
      data: userD,
      message: "User registerd",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    if (user.otp != otp) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid OTP",
      });
    }

    const userD = await Users.findByIdAndUpdate(user._id, { isVerified: true });

    const userData = await Users.findOne({ email }).select("-password -otp");

    console.log(userData);

    res.status(200).json({
      success: true,
      data: userData,
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    const passCheck = await bcrypt.compare(password, user.password);

    console.log(passCheck);

    if (!passCheck) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Wrong email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Email not verified.",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    console.log(accessToken, refreshToken);

    const userD = await Users.findOne({ email }).select("-password");

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
      })
      .json({
        success: true,
        data: userD,
        message: "Login successfully.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

const generateNewTokens = async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Token not found.",
      });
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET,
    );

    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid Token.",
      });
    }

    const user = await Users.findById(decodedToken?._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "User not found.",
      });
    }

    console.log("user?.refreshToken ==========", user);
    console.log("token @@@@@@@@@", token);

    console.log("===");

    if (user?.refreshToken != token) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid token for these user.",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    console.log(accessToken, refreshToken);

    const userD = await Users.find({ _id: user._id }).select("-password");

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        maxAge: 60 * 60,
        secure: true,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60,
        secure: true,
        httpOnly: true,
      })
      .json({
        success: true,
        data: userD,
        message: "New Tokens generated successfully.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.body?._id, {
      $unset: {
        refreshToken: 1,
      },
    });

    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        data: null,
        message: "User Logout",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error " + error.message,
    });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  generateNewTokens,
  logout,
  generateTokens,
};
