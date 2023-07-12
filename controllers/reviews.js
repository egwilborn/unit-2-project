//require models here
const Podcast = require("../models/podcast");

//export functions here
module.exports = {
  new: newReview,
  create,
  delete: deleteReview,
  edit,
  update,
};

async function newReview(req, res) {
  try {
    //find the podcast that is being reviewed and pass it into res.render
    const podcast = await Podcast.findById(req.params.id)
      .populate("hosts")
      .exec();
    res.render("reviews/new", { podcast });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  ////change the checkbox output to a true/false output
  req.body.recommended = !!req.body.recommended;
  //add userID and username into req.body
  req.body.userId = req.user._id;
  req.body.userName = req.user.userName;
  try {
    //find the podcast you are reviewing
    const podcast = await Podcast.findById(req.params.id);
    //add contents of req.body into reviews model
    podcast.reviews.push(req.body);
    //save the changes you've made to the podcast model
    await podcast.save();
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteReview(req, res) {
  try {
    //find the podcast that contains the review you are deleting
    const podcastWithReview = await Podcast.findOne({
      "reviews._id": req.params.id,
      "reviews.userId": req.user._id,
    });
    //remove that review from the review schema embedded in the podcast
    podcastWithReview.reviews.remove(req.params.id);
    //save the changes made to that podcast
    podcastWithReview.save();
    //redirect to show page for the podcast that contained the review
    res.redirect(`/podcasts/${podcastWithReview._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    const podcast = await Podcast.findOne({
      "reviews._id": req.params.id,
      "reviews.userId": req.user._id,
    })
      .populate("hosts")
      .exec();
    const review = podcast.reviews.id(req.params.id);
    res.render("reviews/edit", { podcast, review });
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  req.body.recommended = !!req.body.recommended;
  try {
    const podcast = await Podcast.findOne({
      "reviews._id": req.params.id,
      "reviews.userId": req.user._id,
    });
    const review = podcast.reviews.id(req.params.id);
    review.content = req.body.content;
    review.rating = req.body.rating;
    review.recommended = req.body.recommended;
    await podcast.save();
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}
