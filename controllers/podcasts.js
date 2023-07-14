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
    //get all podasts to populate the index page
    const podcasts = await Podcast.find({}).sort({ genre: "asc" }); // currently sorting by genre
    //render the index ejs file and pass in all the podcasts
    res.render("podcasts/index", { podcasts });
  } catch (err) {
    console.log(err);
  }
}

function newPodcast(req, res) {
  //just need to render the form (new.ejs)
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
    //redirect to the index page to see new podcast added to
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    //find the correct podcast for the show page and the corresponding review to pass into res.render
    const podcast = await Podcast.findById(req.params.id)
      .populate("hosts") // this pulls host information from each host document and populates the podcast object with it
      .exec();
    const reviews = podcast.reviews;
    //finds the all the hosts not included in the specific podcast for the dropdown menu
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
  //change the checkbox value into true or false
  req.body.newEpisodes = !!req.body.newEpisodes;
  try {
    //find the podcast thats being updated
    const podcast = await Podcast.findById(req.params.id);
    //update each key value pair in podcast object with form contents
    podcast.title = req.body.title;
    podcast.description = req.body.description;
    podcast.genre = req.body.genre;
    podcast.affiliation = req.body.affiliation;
    podcast.firstAired = req.body.firstAired;
    podcast.newEpisodes = req.body.newEpisodes;
    //save the podcast since it's being changed
    await podcast.save();
    //redirec to the podcast show page
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deletePodcast(req, res) {
  try {
    //find the podcast using req.params.id and delete the document
    await Podcast.findOneAndDelete({ _id: req.params.id });
    //redirect to podcast list
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

async function follow(req, res) {
  try {
    //find the podcast the user wants to follow
    const podcast = await Podcast.findById(req.params.id);
    //add the user that made the request(their id) into the podcast schema
    podcast.usersFollowing.push(req.user._id);
    //save the podcast document
    await podcast.save();
    //redirect to podcast show page
    res.redirect(`/podcasts/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}
