const router = require('express').Router();
const mongoose = require('mongoose');
const Show = require('../models/Show.model');

//  POST /api/shows  -  Creates a new show
router.post('/shows', (req, res, next) => {
	const { name, summary } = req.body;

	const newShow = {
		name: name,
		summary: summary,
		reviews: [],
	};

	Show.create(newShow)
		.then((response) => res.status(201).json(response))
		.catch((err) => {
			console.log('error creating a new show', err);
			res.status(500).json({
				message: 'error creating a new show',
				error: err,
			});
		});
});

// GET /api/shows -  Retrieves all of the shows
router.get('/shows', (req, res, next) => {
	Show.find()
		.populate('reviews', 'author')
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

//  GET /api/shows/:showId  -  Get details of a specific show by id
router.get('/shows/:showId', (req, res, next) => {
	const { showId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(showId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Show.findById(showId)
		.populate({ path: 'reviews', populate: { path: 'author' } })
		.then((show) => res.json(show))
		.catch((err) => {
			console.log('error getting details of a show', err);
			res.status(500).json({
				message: 'error getting details of a show',
				error: err,
			});
		});
});

// DELETE /api/shows/:showId  -  Delete a specific show by id
router.delete('/shows/:showId', (req, res, next) => {
	const { showId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(showId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
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
			console.log('error deleting show', err);
			res.status(500).json({
				message: 'error deleting show',
				error: err,
			});
		});
});

router.put('/shows/:showId/like/:likedBy', (req, res, next) => {
	const { showId, likedBy } = req.params;
	Show.findByIdAndUpdate(
		showId,
		{
			$addToSet: { favorites: likedBy },
		},
		{ new: true }
	)
		.then((result) => {
			return res.json(result);
		})
		.catch((e) => {
			res.status(422).json({ error: err });
		});
});

router.put('/shows/:showId/unlike/:likedBy', (req, res, next) => {
	const { showId, likedBy } = req.params;
	Show.findByIdAndUpdate(
		showId,
		{
			$pull: { favorites: likedBy },
		},
		{ new: true }
	)
		.then((result) => {
			return res.json(result);
		})
		.catch((e) => {
			res.status(422).json({ error: err });
		});
});

router.get('/shows/tag/:type/:filtername', (req, res, next) => {
	const { filtername, type } = req.params;
	// const filterType = type.charAt(0).toUpperCase() + type.slice(1);
	const filterTag = new RegExp(filtername, 'i');
	console.log(filterTag);
	console.log(type);

	Show.find({ [type]: { $regex: filterTag } })
		.then((result) => {
			console.log(result);
			return res.json(result);
		})
		.catch((e) => {
			res.status(422).json({ error: err });
		});
});

module.exports = router;
