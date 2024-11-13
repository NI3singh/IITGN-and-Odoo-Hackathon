require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { TwitterApi } = require('twitter-api-v2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Set up Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
  bearertoken: process.env.BEARER_TOKEN,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/postTweet', async (req, res) => {
  const { name, contact, address, description } = req.body;
  const tweetContent = `Emergency Help Request:\nName: ${name}\nContact: ${contact}\nAddress: ${address}\nDescription: ${description}`;

  try {
    // Post the tweet
    await twitterClient.v2.tweet(tweetContent);
    res.status(200).json({ message: 'Tweet posted successfully!' });
  } catch (error) {
    console.error('Error posting tweet:', error);
    res.status(500).json({ error: 'Failed to post tweet' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
