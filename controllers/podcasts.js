//require models here when needed
const Podcast = require("../models/podcast");
const Host = require("../models/host");
//export functions here
module.exports = {
  index,
  new: newPodcast,
  create,
  show,
  edit,
  update,
  delete: deletePodcast,
  follow,
};

async function index(req, res) {
  try {
    const podcasts = await Podcast.find({});
    podcasts.forEach(function (p) {
      p.populate("hosts");
    });
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
    const podcast = await Podcast.findById(req.params.id)
      .populate("hosts")
      .exec();
    const reviews = podcast.reviews;
    const hosts = await Host.find({ _id: { $nin: podcast.hosts } });
    //render the show page:
    res.render("podcasts/show", { podcast, reviews, hosts });
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    //find the correct podcast to pass into the edit form
    const podcast = await Podcast.findById(req.params.id);
    res.render("podcasts/edit", { podcast });
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  req.body.newEpisodes = !!req.body.newEpisodes;
  try {
    const podcast = await Podcast.findById(req.params.id);
    podcast.title = req.body.title;
    podcast.hosts = req.body.hosts;
    podcast.description = req.body.description;
    podcast.genre = req.body.genre;
    podcast.affiliation = req.body.affiliation;
    podcast.firstAired = req.body.firstAired;
    podcast.newEpisodes = req.body.newEpisodes;
    await podcast.save();
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deletePodcast(req, res) {
  try {
    await Podcast.findOneAndDelete({ _id: req.params.id });
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

async function follow(req, res) {
  try {
    const podcast = await Podcast.findById(req.params.id);
    podcast.usersFollowing.push(req.user._id);
    await podcast.save();
    res.redirect(`/podcasts/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}
