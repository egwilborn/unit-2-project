const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

//no prepended file paths for reviews router
router.get("/podcasts/:id/reviews/new", reviewsCtrl.new);
//creates a new review
router.post("/podcasts/:id/reviews", reviewsCtrl.create);

module.exports = router;
