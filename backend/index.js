const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("./config/db");
const { UserModel } = require("./models/USer.model");
const { blogRouter } = require("./routes/blog.routes");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send({ msg: "API working, check/ping" });
});
app.get("/ping", (req, res) => {
  res.send({ msg: "pong" });
});
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  //   if (!name || !email || !password) {
  //   }
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      await UserModel.create({ name, email, password: hash });
      console.log(hash);
      return res.send({ msg: "signup successfully" });
    });
  } catch (error) {
    return res.send({ msg: "Something went wrong please try again later" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send({ msg: "Invalid credentials" });
  }
  const hash = user.password;
  console.log(hash);
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      var token = jwt.sign({ userID: user._id }, "masaisecret");
      return res.send({ msg: "Login successful", token: token });
    } else {
      return res.send({ msg: "Login failed" });
    }
  });
});
app.use(authentication);

app.use("/blogs", blogRouter);
app.listen("7500", async () => {
  try {
    await connection();
    console.log("connected to mongodb successfully");
  } catch (error) {
    console.log("error while connecting to DB");
    console.log(error);
  }
  console.log("listening on port 7500");
});
