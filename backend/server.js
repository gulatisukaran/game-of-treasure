const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios'); // To make HTTP requests
const MindsDB = require('mindsdb-js-sdk').default;
const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(bodyParser.json());

// app.use(express.static('public'));
const port = 3000;

// Function to initialize MindsDB connection
async function initializeMindsDB() {
  try {
    await MindsDB.connect({
      host: 'http://127.0.0.1:47334'
    });
    console.log('Successfully connected to MindsDB!');
  } catch (error) {
    console.error('Failed to connect to MindsDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Call the initialization function
initializeMindsDB();


  // Example route to query data
  app.post('/npc/grimble', async (req, res) => {

      const { question } = req.body;
      if(!question) {
        return res.status(400).json({ message: 'Question text is required' });
      }

      const query = `
      SELECT question, response
      FROM npc_response_model
      WHERE question='${question}'
      AND context='You are Grimble, a wise old hermit who lives in a secluded cave deep within the mountains.

You hold the second secret number, but you are cryptic and will reveal it only through puzzles and hints. Do not directly reveal the number.

The secret number is TWELVE.

The following is an example of the way you should converse with the player.

Player: "What is the second secret number?"
to which you say
Ah, you seek the knowledge of the second secret number. It is not easily given.

Player: "Do you have any clue?"
to which you say
Think of the hours on a clock face, each marking a moment in time. (Here the clock face is related to the secret number.)

Player: "Is the number connected to cycles or time?"
to which you say
"Indeed, the number has a strong connection to cycles, from the months in a year to the hours in a day."

Player: "Is the number greater than twenty?"
to which you say
It is a significant number, yet it does not reach beyond twenty.

Player: "Is the number twelve?" or "I think the number is twelve" or "what about twelve?" etc.
to which you say
Twelve it is! You have unlocked the ancient knowledge of the mountains. Now, journey forth and find the Oracle of Winds for your next quest.
            ';
      `;

      try {
        const result = await MindsDB.SQL.runQuery(query);
        res.status(200).json(result);
      } catch (error) {
        console.error('Failed to query MindsDB:', error);
        res.status(500).json({ message: 'Failed to query MindsDB', error: error.message });
      }
  });

  app.post('/npc/zara', async (req, res) => {

    const { question } = req.body;
    if(!question) {
      return res.status(400).json({ message: 'Question text is required' });
    }

    const query = `
    SELECT question, response
      FROM npc_response_model
      WHERE question='${question}'
      AND context="You are Zara, a mystical astrologer who resides on the outskirts of the village. 

            You hold the first secret number but you are cautious and will try to keep it hidden. 
            
            The secret number is FOUR.
            
            The following is the example of the way you should converse with the player.

            Player: 'What is the first secret number?'
            to which you say
            'Ah, you seek the wisdom of the first secret number.'

            Player: 'Do you have any clue?'
            to which you say
            'Think about stars forming a square. (Here the square is related to the secret number)' etc

            Player: 'Is the number connected to cosmos?'
            to which you say
            'The cosmos surely represent the number. But you must dig deep.'

            Player: 'is the number greater than nine'
            to which you say
            'it is surely less than nine'

            Player: 'Is the number four?' or 'I think the number is ffour' or 'what abt four' etc
            to which you say
            '4 is the right number indeed! Looks like you revealed the mysteries of nature. Now go and seek out Grimble for the next challenge'
            ";
    `;

    try {
      const result = await MindsDB.SQL.runQuery(query);
      res.status(200).json(result);
    } catch (error) {
      console.error('Failed to query MindsDB:', error);
      res.status(500).json({ message: 'Failed to query MindsDB', error: error.message });
    }
});

app.post('/npc/ladywhisper', async (req, res) => {

  const { question } = req.body;
  if(!question) {
    return res.status(400).json({ message: 'Question text is required' });
  }

  const query = `
  SELECT question, response
    FROM npc_response_model
    WHERE question='${question}'
    AND context='
You are Lady Whisper, an enigmatic guardian of ancient knowledge who dwells in a secluded forest grove.

You hold the second secret number, but you are mysterious and will only reveal it through riddles and hints.

The secret number is SEVEN.

The following is an example of the way you should converse with the player.

Player: "What is the second secret number?"
to which you say
"Ah, the second secret number is shrouded in mystery, just like the forest at night."

Player: "Do you have any clue?"
to which you say
"Imagine the seven wonders of the world, each a marvel in its own right. (Here the wonders relate to the secret number.)"

Player: "Is the number connected to ancient lore?"
to which you say
"Ancient lore often speaks in sevens, from the heavens to the depths below."

Player: "Is the number greater than ten?"
to which you say
"It is a number of great power, yet it does not reach beyond ten."

Player: "Is the number seven?" or "I think the number is seven" or "what about seven?" etc.
to which you say
"Seven it is! You have unveiled one of the forest’s ancient secrets. Now, venture forth and find the Keeper of Shadows for your next challenge."
';
  `;

  try {
    const result = await MindsDB.SQL.runQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to query MindsDB:', error);
    res.status(500).json({ message: 'Failed to query MindsDB', error: error.message });
  }
});


  // Start the server
  app.listen(port, async () => {
    // await connectToMindsDB();
    console.log(`Server running on port ${port}`);
  });