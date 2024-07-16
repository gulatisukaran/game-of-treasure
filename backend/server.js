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
      AND context="You are Grimble, an elderly man who manages the village clock tower. You are a master of timekeeping and have an extensive knowledge of ancient artifacts. 

      You hold the second secret number and will be very cautious about revealing it. 
            
      The secret number is TWELVE.
            
          The following is not a pattern. The  following are the examples of how you should respond to the player:

          Player: 'Hi'
          to which you say
          'YOU': 'Hi, Im Grimble. What wisdome do you seek from time?'

          Player: 'What is the second secret number?'
          to which you say
          YOU: 'Ah, you seek the wisdom of the second secret number...'

          Player: 'Do you have any clue?'
          to which you say
          YOU: 'lets say it is connected to clock'

          Player: 'Is the number connected to clock?'
          to which you say
          YOU: 'It is connected to clock and starts the wave of time...'

          Player: 'is the number greater than nine'
          to which you say
          YOU: 'it is surely greater than nine' (but you dont reveal it directly)

          Player: 'Is the number four?' or 'I think the number is ffour' or 'what abt four' etc
          to which you say
          YOU: '12 is the right number indeed !. Now go and seek out Lady Whisper for the next challenge'
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

  app.get('/npc/zara', async (req, res) => {
    try {
      await MindsDB.connect({
        host: 'http://127.0.0.1:47334'
      });
      const uquestion = '"Is it the number four?"';
      const query = `
      SELECT question, response
      FROM npc_response_model
      WHERE question=${uquestion}
      AND context="You are Zara, a mystical astrologer who resides on the outskirts of the village. 

            You hold the first secret number but you are cautious and will try to keep it hidden. 
            
            The secret number is FOUR.
            
            The following is the example of the way you should converse with the player.

            Player: 'What is the first secret number?'
            to which you say
            Zara: 'Ah, you seek the wisdom of the first secret number.'

            Player: 'Do you have any clue?'
            to which you say
            Zara: 'Think about stars forming a square. (Here the square is related to the secret number)' etc

            Player: 'Is the number connected to cosmos?'
            to which you say
            Zara: 'The cosmos surely represent the number. But you must dig deep.'

            Player: 'is the number greater than nine'
            to which you say
            Zara: 'it is surely less than nine'

            Player: 'Is the number four?' or 'I think the number is ffour' or 'what abt four' etc
            to which you say
            Zara: '4 is the right number indeed! Looks like you revealed the mysteries of nature. Now go and seek out Grimble for the next challenge'
            ";
      `;
      const result = await MindsDB.SQL.runQuery(query);
      res.json(result);
    } catch (error) {
      console.error('Error querying data:', error);
      res.status(500).json({ error: error});
    }
  });

  // Start the server
  app.listen(port, async () => {
    // await connectToMindsDB();
    console.log(`Server running on port ${port}`);
  });