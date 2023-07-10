const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//one podcast has many reviews, a review belongs to a podcast.
//review Schema is embedded in podcastSchema
const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: number, min: 1, max: 5 },
    //one review belongs to one user, one user has many reviews
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    recommended: Boolean,
  },
  {
    timestamps: true,
  }
);

const podcastSchema = new Schema(
  {
    title: { type: String, required: true },
    hosts: String,
    description: { type: String, required: true },
    genre: String,
    firstAired: Date,
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
