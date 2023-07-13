const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//a podcast has many hosts and host can have manypodcasts
//going to link hosts to podcasts AND link podcasts to hosts
const hostSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    affiliation: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Host", hostSchema);
