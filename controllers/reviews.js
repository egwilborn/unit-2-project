//require models here
const Podcast = require("../models/podcast");

//export functions here
module.exports = {
  new: newReview,
  create,
};

async function newReview(req, res) {
  const podcast = await Podcast.findById(req.params.id);
  console.log(podcast);
  res.render("reviews/new", { podcast });
}

async function create(req, res) {
  req.body.recommended = !!req.body.recommended;
  req.body.userId = req.user._id;
  req.body.userName = req.user.userName;
  const podcast = await Podcast.findById(req.params.id);
  podcast.reviews.push(req.body);
  await podcast.save();
  res.redirect(`/podcasts/${podcast._id}`);
}
