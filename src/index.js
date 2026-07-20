// console.log("Hello Node");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
app.use(cors({
  origin: "https://lms-frontend-psi-ochre.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// api
const apiRoutes = require("./routes/api/v1");
const connectMangoDB = require("./db/mangoDB");
const googleProvider = require("./service/passport");
const passport = require("passport");
const connectSocketIO = require("./service/socketIO");
const db = require("../models");

// connectSocketIO();

app.use(
  require("express-session")({
    secret: process.env.EXPRESS_SESSION,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// connect to MongoDB
connectMangoDB();
// googleProvider();

app.get("/", (req, res) => {
  res.send("Sever connected.")
})

app.use("/api/v1", apiRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;

// (async () => {
//   // await db.sequelize.sync({ alter: true });
//   app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
//   });
// })();
