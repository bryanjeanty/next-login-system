const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email is required"
    }
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password"
});

module.exports = mongoose.model("User", UserSchema);
