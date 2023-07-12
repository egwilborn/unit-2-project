//require models here
const Host = require("../models/host");
const Podcast = require("../models/podcast");

module.exports = {
  new: newHost,
  create,
  addHost,
  show,
};

function newHost(req, res) {
  //don't need to access models since we're just rendering the page to use to add a new host
  res.render("hosts/new");
}

async function create(req, res) {
  const newHost = await Host.create(req.body);
  //redirect to the podcasts page for now
  res.redirect("/podcasts");
}

async function addHost(req, res) {
  try {
    //adding the host to the podcast schema
    const podcast = await Podcast.findById(req.params.id);
    podcast.hosts.push(req.body.hostId);
    podcast.save();
    //also adding the podcast to the host schema at the same time
    const host = await Host.findById(req.body.hostId);
    host.podcasts.push(req.params.id);
    host.save();
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    const host = await Host.findById(req.params.id).populate("podcasts").exec();
    res.render("hosts/show", { host });
  } catch (err) {
    console.log(err);
  }
}
