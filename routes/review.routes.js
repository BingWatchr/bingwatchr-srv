const router = require("express").Router();
const mongoose = require("mongoose");

const Show = require("../models/Show.model");
const Review = require("../models/Review.model");

//POST create a new review

router.post("/shows/:showId", (req, res, next) => {
  const { text, rating } = req.body;

  const newReview = {
    author: author,
    text: text,
    rating: rating,
    tvShow: tvShow,
  };

  Review.create(newReview)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "error creating review", error: e });
    });
});

// PUT  Updates a specific review by id
router.put("/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    author: author,
    text: text,
    rating: rating,
    tvShow: tvShow,
  };

  Project.findByIdAndUpdate(reviewId, newDetails, { new: true })
    .then((updatedReview) => res.json(updatedReview))
    .catch((e) => {
      console.log("error updating review", e);
      res.status(500).json({
        message: "error updating review",
        error: e,
      });
    });
});

// DELETE  Delete a specific review by id
router.delete("/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(reviewId)
    .then((deletedReview) => {})
    .then(() =>
      res.json({
        message: `Review with id ${reviewId} was removed successfully.`,
      })
    )
    .catch((e) => {
      console.log("error deleting review", e);
      res.status(500).json({
        message: "error deleting review",
        error: e,
      });
    });
});

module.exports = router;
