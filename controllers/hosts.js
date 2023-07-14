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
  try {
    //create new host document using req.body contents
    const newHost = await Host.create(req.body);
    //redirect to the podcasts page for now
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

//req.params.id is podcast id
async function addHost(req, res) {
  try {
    //find the correct podcast
    const podcast = await Podcast.findById(req.params.id);
    //add the host into the podcast document
    podcast.hosts.push(req.body.hostId);
    //save the podcast
    podcast.save();
    //redirect to the podcast show page
    res.redirect(`/podcasts/${podcast._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    //find the podcasts that the host belongs to
    const hostsPodcasts = await Podcast.find({ hosts: req.params.id });
    //find the host that should be shown
    const host = await Host.findById(req.params.id);
    //pass podcasts and host into render function and render host show page
    res.render("hosts/show", { host, hostsPodcasts });
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    //find the host and pass them into the render function
    const host = await Host.findById(req.params.id);
    res.render("hosts/edit", { host });
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res) {
  try {
    //find the host document that needs updating
    const host = await Host.findById(req.params.id);
    //update each key value pair with information from req.body
    host.name = req.body.name;
    host.affiliation = req.body.affiliation;
    host.description = req.body.description;
    //save host document
    host.save();
    //redirect to host show page
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
    //go through each host podcast and remove the host id
    hostsPodcasts.forEach(function (p) {
      p.hosts.remove(req.params.id);
      p.save();
    });
    //redirect to the podcast list
    res.redirect("/podcasts");
  } catch (err) {
    console.log(err);
  }
}

//req.params.podid = podcast id
//req.params.hid = host id
async function removeHost(req, res) {
  try {
    //find podcast your removing the hosts from
    const podcast = await Podcast.findById(req.params.podid);
    //removing the host
    podcast.hosts.remove(req.params.hid);
    //save the podcast document
    podcast.save();
    //redirect to the show page
    res.redirect(`/podcasts/${req.params.podid}`);
  } catch (err) {
    console.log(err);
  }
}
