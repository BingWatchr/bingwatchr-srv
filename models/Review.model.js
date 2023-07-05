const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
	{
		author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		text: {
			type: String,
		},
		rating: {
			type: Number,
			required: [true, 'Please rate the Show.'],
			min: 1,
			max: 5,
		},

		tvShow: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Review = model('Review', reviewSchema);

module.exports = Review;
