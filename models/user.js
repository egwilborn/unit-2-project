const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//one podcast has many usersFollowing, one user follows many podcasts

const userSchema = new Schema(
  {
    userName: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
