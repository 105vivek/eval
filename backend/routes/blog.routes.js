const express = require("express");
const { BlogModel } = require("../models/Blog.models");
const jwt = require("jsonwebtoken");

const blogRouter = express.Router();
blogRouter.get("/", async (req, res) => {
  const blogs = await BlogModel.find();
  res.send({ blogs: blogs });
});
blogRouter.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  let author_email = "";
  jwt.verify(token, "masaisecret", async (err, decoded) => {
    console.log(decoded);
    const userId = decoded.userId;
    const user = await BlogModel.findOne();
    author_email = user.email;
    await BlogModel.create({
      title,
      description,
      author_email,
    });
    res.send({ msg: "blog created" });
  });
});
module.exports = { blogRouter };
