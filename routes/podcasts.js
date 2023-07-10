const express = require("express");
const router = express.Router();
const podcastsCtrl = require("../controllers/podcasts");

//routing to home/podcasts page
//every route has prepended file path "/podcasts"
router.get("/", podcastsCtrl.index);

module.exports = router;
