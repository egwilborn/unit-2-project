const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//one podcast has many reviews, a review belongs to a podcast.
//review Schema is embedded in podcastSchema
const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    //one review belongs to one user, one user has many reviews
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    recommended: Boolean,
  },
  {
    timestamps: true,
  }
);
//a podcast has many hosts, a host can have many podcasts
const podcastSchema = new Schema(
  {
    title: { type: String, required: true },
    hosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Host" }],
    description: { type: String, required: true },
    genre: String,
    firstAired: Number,
    newEpisodes: Boolean,
    affiliation: String,
    reviews: [reviewSchema],
    //a podcast has many users following, a user follows many podcasts
    usersFollowing: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Podcast", podcastSchema);
