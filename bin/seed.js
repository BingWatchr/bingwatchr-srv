const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bingewatchr-srv";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    const response = await axios.get("https://api.tvmaze.com/shows");
    const shows = response.data;

    // Mapping the array and updating the value of image
    const updatedData = shows.map((item) => ({
      ...item,
      image: item.image.medium,
      /* rating: Math.round(item.rating.average / 2), */
      rating: 0,
      weight: 0,
    }));

    /* console.log(updatedData); */
    // Clear existing data from the collection
    await db.collection("shows").deleteMany({});

    // Save the fetched shows to the database
    await db.collection("shows").insertMany(updatedData);

    console.log("Shows seeded successfully");
    db.close();
  } catch (error) {
    console.error("Error seeding shows:", error);
    db.close();
  }
});
