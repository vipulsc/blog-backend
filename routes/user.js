const { Router } = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
userRoute = Router();

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
    const token = jwt.sign({ userId: existUser._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.send;
  } catch (error) {
    console.log("login", error);
    res.status(201).json({ message: "Internal Server Error" });
  }
});
