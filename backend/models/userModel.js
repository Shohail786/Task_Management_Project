const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter the name"],
  },
  password: {
    type: String,
    required: [true, "Enter the password"],
  },
});

// Hashing the password before saving the user to the database
user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

user.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiredIn: process.env.JWT_EXPIRE,
  });
};

user.methods.comparePassword = async function (Password) {
  console.log(Password, this.password);
  return await bcrypt.compare(Password, this.password);
};

module.exports = mongoose.model("User", user);
