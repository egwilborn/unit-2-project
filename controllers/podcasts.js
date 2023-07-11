//require models here when needed
const Podcast = require("../models/podcast");
//export functions here
module.exports = {
  index,
  new: newPodcast,
  create,
  show,
};

async function index(req, res) {
  try {
    const podcasts = await Podcast.find({});
    res.render("podcasts/index", { podcasts });
  } catch (err) {
    console.log(err);
  }
}

function newPodcast(req, res) {
  res.render("podcasts/new");
}

async function create(req, res) {
  try {
    //req.body contains all the information in the correct format except for newEpisodes which is a checkbox
    //need to change newEpisodes from checkbox into a boolean
    req.body.newEpisodes = !!req.body.newEpisodes;
    //now creating new podcast entry in db
    //then redirect to podcast index to see new entry in the list
    const podcast = await Podcast.create(req.body);
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    //find the correct podcast for the show page and the corresponding review to pass into res.render
    const podcast = await Podcast.findById(req.params.id);
    const reviews = podcast.reviews;
    //render the show page:
    res.render("podcasts/show", { podcast, reviews });
  } catch (err) {
    console.log(err);
  }
}
