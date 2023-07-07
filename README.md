# BingeWatchr - Server

This is the server-side code for the TV Show Review application. It retrieve TV show data from the TVmaze API and provides the necessary API endpoints to handle user reviews, and manage favorites. The server is built using Node.js and Express.js and uses MongoDB as the database to store user information and reviews.

## Features

- Fetch TV show data from the TVmaze API
- Store user reviews and ratings
- Manage user favorites
- Provide API endpoints for client-side communication

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data and reviews
- Mongoose: MongoDB object modeling for Node.js
- Axios: HTTP client for making requests to external APIs

## Setup

1. Clone the repository:
git clone https://github.com/BingWatchr/bingwatchr-srv.git

2. Install dependencies:
npm install

3. Configure the database:

- create an .env file
- Add:
    - PORT=5005
    - ORIGIN=http://localhost:3000
    - TOKEN_SECRET=y0uRt0k3N$eCr3T
    - MONGODB_URI= yourMONGODBlink

4. Start the server:
npm run dev

5. The server will start running on `http://localhost:5005`.

6. You can seed the database with the command node bin/seed.js

## Link to client repo
- https://github.com/BingWatchr/bingwatchr-cli.git