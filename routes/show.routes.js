const router = require("express").Router();

const mongoose = require("mongoose");

const Show = require("../models/Show.model");
const Review = require("../models/Review.model");

//  POST /api/shows  -  Creates a new show
router.post("/shows", (req, res, next) => {
  const { name, summary } = req.body;

  const newShow = {
    name: name,
    summary: summary,
    reviews: [],
  };

  Show.create(newShow)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new show", err);
      res.status(500).json({
        message: "error creating a new show",
        error: err,
      });
    });
});

// GET /api/shows -  Retrieves all of the shows
router.get("/shows", (req, res, next) => {
  Show.find()
    .populate("reviews")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error getting list of shows", err);
      res.status(500).json({
        message: "error getting list of shows",
        error: err,
      });
    });
});

//  GET /api/shows/:showsId  -  Get details of a specific show by id
router.get("/shows/:showsId", (req, res, next) => {
  const { showsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(showsId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Show.findById(showsId)
    .populate("reviews")
    .then((show) => res.json(show))
    .catch((err) => {
      console.log("error getting details of a show", err);
      res.status(500).json({
        message: "error getting details of a show",
        error: err,
      });
    });
});

// DELETE /api/shows/:showId  -  Delete a specific show by id
router.delete("/shows/:showId", (req, res, next) => {
  const { showId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(showId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Show.findByIdAndRemove(showId)
    .then((deletedShow) => {
      return Review.deleteMany({ _id: { $in: deletedShow.reviews } }); //delete all associated reviews
    })
    .then(() =>
      res.json({
        message: `Show with id ${showId} & all associated reviews were removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting show", err);
      res.status(500).json({
        message: "error deleting show",
        error: err,
      });
    });
});

module.exports = router;
