const { Router } = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, blogModel } = require("../db");
const { authentication } = require("../middlewares/user");
const dotenv = require("dotenv").config();

const userRoute = Router();
const userSecret = process.env.userSecret;

const userSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

userRoute.post("/signup", async (req, res) => {
  const parsedUser = userSchema.safeParse(req.body);
  if (!parsedUser.success)
    return res.status(400).json({ message: "User input invalid" });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await userModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const existUser = await userModel.findOne({ username: req.body.username });
    if (!existUser) return res.status(403).json({ message: "Please Sign Up" });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ userId: existUser._id }, userSecret, {
      expiresIn: "1h",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoute.post("/newPost", authentication, async (req, res) => {
  try {
    const newBlog = new blogModel({ ...req.body, author: req.userId });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding blog" });
  }
});

userRoute.put("/edit/:id", authentication, async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    Object.assign(blog, req.body);
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Error updating blog" });
  }
});

module.exports = { userRoute };
