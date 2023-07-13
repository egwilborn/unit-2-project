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
//delete a host
router.delete("/hosts/:id", hostsCtrl.delete);
//show an edit page for the host
router.get("/hosts/:id/edit", hostsCtrl.edit);
//to update the host information
router.put("/hosts/:id", hostsCtrl.update);
//to remove connection between host and podcast
router.delete("/podcasts/:podid/hosts/:hid", hostsCtrl.removeHost);

module.exports = router;
