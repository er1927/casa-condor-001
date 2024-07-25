const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { email, message } = req.body;

  const newMessage = {
    email,
    message,
    date: new Date().toISOString(),
  };

  fs.readFile('messages.json', (err, data) => {
    if (err) {
      console.error('Error reading messages.json:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    
    const messages = JSON.parse(data || '[]');
    messages.push(newMessage);

    fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error('Error writing to messages.json:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
