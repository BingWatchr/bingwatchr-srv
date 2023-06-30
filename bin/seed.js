const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const MONGO_URI =
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bingewatchr-srv';

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
	console.log('Connected to MongoDB');

	try {
		const response = await axios.get('https://api.tvmaze.com/shows');
		const shows = response.data;

		// Clear existing data from the collection
		await db.collection('shows').deleteMany({});

		// Save the fetched shows to the database
		await db.collection('shows').insertMany(shows);

		console.log('Shows seeded successfully');
		db.close();
	} catch (error) {
		console.error('Error seeding shows:', error);
		db.close();
	}
});
