const { Router } = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const dotenv = require("dotenv").config();
userRoute = Router();
const userSecret = process.env.userSecret;

const userSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

userRoute.post("/signup", async (req, res) => {
  const parsedUser = userSchema.safeParse(req.body);

  const { username, firstName, lastName, password } = req.body;

  if (!parsedUser.success) {
    res.status(400).json({ message: "user input invalid" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    res.status(201).json({ message: "user signed up Successfully" });
  } catch (error) {
    console.log("signup", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existUser = await userModel.findOne({ username });
    if (!existUser) {
      return res.status(403).json({ message: "Please signUp" });
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: existUser._id }, userSecret, {
      expiresIn: "1h",
    });
    console.log(token);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json({ message: "User login successfully" });
  } catch (error) {
    console.log("login", error);
    res.status(201).json({ message: "Internal Server Error" });
  }
});



module.exports = {
  userRoute,
};
