const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

async function authentication(req, res, next) {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ message: "Please Sign In" });

    const decoded = jwt.verify(token, process.env.userSecret);
    if (!decoded) return res.status(403).json({ message: "Please Sign In" });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  authentication,
};
