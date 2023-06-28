const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
	{
		author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		text: {
			type: String,
		},
		rating: {
			type: Number,
			required: [true, 'Please rate the TV show.'],
			min: 1,
			max: 10,
		},

		tvShow: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Review = model('Review', showSchema);

module.exports = Review;
