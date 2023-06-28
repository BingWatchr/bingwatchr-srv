const router = require("express").Router();
const mongoose = require("mongoose");

const Show = require("../models/Show.model");
const Review = require("../models/Review.model");

//POST create a new show

router.post("/shows", (req, res, next) => {
  const { title, description, imgURL, genres } = req.body;

  const newShow = {
    title: title,
    description: description,
    imgURL: imgURL,
    genres: genres,
    reviews: [],
    apiId: "",
  };

  Show.create(newShow)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "error creating show", error: e });
    });
});

router.get("/shows", (req, res, next) => {
  Show.find()
    .populate("reviews")
    .then((response) => res.json(response))
    .catch((e) => {
      console.log("error getting shows", e);
      res.status(500).json({
        message: "error getting shows",
        error: e,
      });
    });
});

router.get("/shows/:showId", (req, res, next) => {
  const { showId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(showId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Show.findById(showId)
    .populate("reviews")
    .then((response) => res.json(response))
    .catch((e) => {
      console.log("error getting the show", e);
      res.status(500).json({
        message: "error getting the show",
        error: e,
      });
    });
});

module.exports = router;
