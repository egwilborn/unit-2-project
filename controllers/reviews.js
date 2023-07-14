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
      .populate("hosts") // populate the podcast hosts connected with the podcast
      .exec();
    res.render("reviews/new", { podcast });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  //change the checkbox output to a true/false output
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
    //redirect to podcast show page
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
      "reviews.userId": req.user._id, // makes sure logged in user can only delete the reviews they wrote
    });
    //remove that review from the review object embedded in the podcast
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
    //find the podcast containing the review to pass into the res.render function
    const podcast = await Podcast.findOne({
      "reviews._id": req.params.id,
      "reviews.userId": req.user._id,
    })
      .populate("hosts") // populate the hosts objects within the podcast
      .exec();
    //find the review subdocument from within the podcast document
    const review = podcast.reviews.id(req.params.id);
    //render the edit page and pass in the review and podcast information
    res.render("reviews/edit", { podcast, review });
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  //change the checkbox output to a true/false output
  req.body.recommended = !!req.body.recommended;
  try {
    //find the podcast containing the review
    const podcast = await Podcast.findOne({
      "reviews._id": req.params.id,
      "reviews.userId": req.user._id,
    });
    //pull out the review that needs updating
    const review = podcast.reviews.id(req.params.id);
    //update each review key value pair
    review.content = req.body.content;
    review.rating = req.body.rating;
    review.recommended = req.body.recommended;
    //save the podcast document
    await podcast.save();
    //redirect to the podcast show page
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}
