//require models here
const Host = require("../models/host");
const Podcast = require("../models/podcast");

module.exports = {
  new: newHost,
  create,
  addHost,
  show,
  edit,
  update,
  delete: deleteHost,
  removeHost,
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

//req.params.id is podcast id
async function addHost(req, res) {
  try {
    //adding the host to the podcast schema
    const podcast = await Podcast.findById(req.params.id);
    podcast.hosts.push(req.body.hostId);
    podcast.save();
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    const hostsPodcasts = await Podcast.find({ hosts: req.params.id });
    const host = await Host.findById(req.params.id);
    res.render("hosts/show", { host, hostsPodcasts });
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    const host = await Host.findById(req.params.id);
    res.render("hosts/edit", { host });
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res) {
  try {
    const host = await Host.findById(req.params.id);
    host.name = req.body.name;
    host.affiliation = req.body.affiliation;
    host.description = req.body.description;
    host.save();
    console.log(host);
    res.redirect(`/hosts/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteHost(req, res) {
  try {
    //delete the host document
    const host = await Host.findOneAndDelete({ _id: req.params.id });
    //now delete the host's objectIDs from the podcasts documents
    const hostsPodcasts = await Podcast.find({ hosts: req.params.id });
    hostsPodcasts.forEach(function (p) {
      p.hosts.remove(req.params.id);
      p.save();
    });
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

//req.params.podid = podcast id
//req.params.hid = host id
async function removeHost(req, res) {
  try {
    const podcast = await Podcast.findById(req.params.podid);
    //removing host from podcast
    podcast.hosts.remove(req.params.hid);
    podcast.save();
    res.redirect(`/podcasts/${req.params.podid}`);
  } catch (err) {
    console.log(err);
  }
}
