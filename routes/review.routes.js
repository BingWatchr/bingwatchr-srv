const router = require("express").Router();
const mongoose = require("mongoose");

const Review = require("../models/Review.model");
const Show = require("../models/Show.model");

//  GET /api/reviews/:reviewId  -  Get details of a specific review by id
router.get("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findById(reviewId)
    .then((review) => res.json(review))
    .catch((err) => {
      console.log("error getting details of a review", err);
      res.status(500).json({
        message: "error getting details of a review",
        error: err,
      });
    });
});

//  POST /api/reviews  -  Creates a new task
router.post("/reviews", (req, res, next) => {
  const { author, text, showId } = req.body;

  const newShowDetails = {
    author: author,
    text: text,
    show: showId,
  };

  Review.create(newReviewDetails)
    .then((reviewFromDB) => {
      return Show.findByIdAndUpdate(reviewId, {
        $push: { reviews: reviewFromDB._id },
      });
    })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new review", err);
      res.status(500).json({
        message: "error creating a new review",
        error: err,
      });
    });
});

// PUT /api/reviews/:reviewId  -  Updates a specific review by id
router.put("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    author: req.body.author,
    text: req.body.text,
  };

  Review.findByIdAndUpdate(reviewId, newDetails, { new: true })
    .then((updatedReview) => res.json(updatedReview))
    .catch((err) => {
      console.log("error updating review", err);
      res.status(500).json({
        message: "error updating review",
        error: err,
      });
    });
});

// DELETE /api/reviews/:reviewId  -  Delete a specific review by id
router.delete("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(reviewId)
    .then((deletedReview) => {})
    .then(() =>
      res.json({
        message: `Review with id ${reviewId} were removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting review", err);
      res.status(500).json({
        message: "error deleting review",
        error: err,
      });
    });
});

module.exports = router;