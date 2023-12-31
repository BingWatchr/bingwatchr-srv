const router = require('express').Router();
const mongoose = require('mongoose');

const Show = require('../models/Show.model');
const Review = require('../models/Review.model');

//POST create a new review
//we can change this  if we want to create a new review directly from the show
router.post('/reviews', (req, res, next) => {
	const { author, text, newRating, showId } = req.body;

	const newReview = {
		author: author,
		text: text,
		rating: newRating,
		tvShow: showId,
	};

	Review.create(newReview)
		.then((reviewsFromDB) => {
			return Show.findByIdAndUpdate(showId, {
				$push: { reviews: reviewsFromDB._id },
			});
		})
		.then((response) => res.status(201).json(response))
		.catch((e) => {
			console.log(e);
			res.status(500).json({ message: 'error creating review', error: e });
		});
});

router.get('/reviews/edit/:reviewId', (req, res, next) => {
	const { reviewId } = req.params;
	if (!mongoose.Types.ObjectId.isValid(reviewId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Review.findById(reviewId)
		.populate('author')
		.populate('tvShow')
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			console.log('error getting list of shows', err);
			res.status(500).json({
				message: 'error getting list of shows',
				error: err,
			});
		});
});

// PUT  Updates a specific review by id
router.put('/reviews/edit/:reviewId', (req, res, next) => {
	const { reviewId } = req.params;
	const { text, rating } = req.body;
	if (!mongoose.Types.ObjectId.isValid(reviewId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	console.log('text:' + text);
	console.log('rating:' + rating);

	const newDetails = {
		text: text,
		rating: rating,
	};

	Review.findByIdAndUpdate(reviewId, newDetails, { new: true })
		.then((updatedReview) => {
			console.log('updated review ' + updatedReview);
			res.json(updatedReview);
		})
		.catch((e) => {
			console.log('error updating review', e);
			res.status(500).json({
				message: 'error updating review',
				error: e,
			});
		});
});

// DELETE  Delete a specific review by id
router.delete('/reviews/:reviewId', (req, res, next) => {
	const { reviewId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(reviewId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Review.findByIdAndRemove(reviewId)
		.then((deletedReview) => {
			console.log(deletedReview + 'Deleted');
			res.json({
				message: `Review with id ${reviewId} were removed successfully.`,
			});
		})
		.catch((err) => {
			console.log('error deleting task', err);
			res.status(500).json({
				message: 'error deleting task',
				error: err,
			});
		});
});

module.exports = router;
