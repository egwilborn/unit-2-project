const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

//no prepended file paths for reviews router
router.get("/podcasts/:id/reviews/new", reviewsCtrl.new);
//creates a new review
router.post("/podcasts/:id/reviews", reviewsCtrl.create);
//deletes review that the user has published
router.delete("/reviews/:id", reviewsCtrl.delete);
//pulls up a form to edit the review
router.get("/reviews/:id/edit", reviewsCtrl.edit);
//updates review with new information
router.put("/reviews/:id", reviewsCtrl.update);

module.exports = router;
