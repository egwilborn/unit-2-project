const express = require("express");
const router = express.Router();
const podcastsCtrl = require("../controllers/podcasts");

//routing to home/podcasts page
//every route has prepended file path "/podcasts"
router.get("/", podcastsCtrl.index);
//for getting to the form to make a new podcast entry
router.get("/new", podcastsCtrl.new);
//for creating a new podcast in the db
router.post("/", podcastsCtrl.create);
//for going to a specific podcast page
router.get("/:id", podcastsCtrl.show);

module.exports = router;
