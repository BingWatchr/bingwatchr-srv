const { Schema, model } = require('mongoose');

const showSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'The TV show must have a title.'],
		},
		summary: {
			type: String,
			required: [true, 'You need to describe the TV show.'],
		},
		imageURL: {
			type: String,
		},
		genres: {
			type: [String],
		},
		apiId: {
			type: String,
		},
		reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
		favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Show = model('Show', showSchema);

module.exports = Show;
