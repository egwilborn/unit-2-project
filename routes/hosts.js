const express = require("express");
const router = express.Router();
const hostsCtrl = require("../controllers/hosts");

//hosts routes are all prepended with "/hosts"
router.get("/hosts/new", hostsCtrl.new);
//adds new host to db
router.post("/hosts", hostsCtrl.create);
//adds a host to a podcast and adds a podcast to a host
router.post("/podcasts/:id/hosts", hostsCtrl.addHost);
//shows the host details
router.get("/hosts/:id", hostsCtrl.show);
module.exports = router;
