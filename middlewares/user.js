const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

async function authentication(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: "Please SignIn" });
  }
  try {
    const decoded = jwt.verify(token, process.env, userSecret);
    if (!decoded) {
      return res.status(403).json({ message: "Please signIn" });
    }
    req.userId = decoded.userId;
  } catch (error) {
    res.status(500).status("Internal Server Error");
  }
}

module.exports = {
  authentication,
};
