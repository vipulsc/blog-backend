const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);
const blogModel = mongoose.model("blog", blogSchema);

module.exports = { userModel, blogModel };
