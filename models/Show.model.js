const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const showSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'The TV show must have a title.'],
		},
		description: {
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
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Show = model('Show', showSchema);

module.exports = Show;
