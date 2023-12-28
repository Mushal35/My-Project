const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

// Create a custom validator to ensure at least one of googleId, facebookId, or githubId is present
userSchema.path("googleId").required(function () {
  return this.googleId || this.facebookId || this.githubId;
}, "At least one of Google ID, Facebook ID, or Github ID is required.");

userSchema.path("facebookId").required(function () {
  return this.googleId || this.facebookId || this.githubId;
}, "At least one of Google ID, Facebook ID, or Github ID is required.");

userSchema.path("githubId").required(function () {
  return this.googleId || this.facebookId || this.githubId;
}, "At least one of Google ID, Facebook ID, or Github ID is required.");

// Custom validator to ensure only one of googleId, facebookId, or githubId is required
// userSchema.pre("save", function (next) {
//   const idsCount = [
//     !!this.googleId,
//     !!this.facebookId,
//     !!this.githubId,
//   ].filter(Boolean).length;
//   if (idsCount !== 1) {
//     const error = new Error(
//       "Only one of Google ID, Facebook ID, or Github ID is required."
//     );
//     return next(error);
//   }
//   return next();
// });

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
