const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema);
module.exports = {
  userModel,
};
