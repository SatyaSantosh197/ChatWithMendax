const express = require('express');
const app = express();
const path = require('path');
const questions = require('./questions.json');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/ask', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Please provide a question.' });
  }
  const answer = questions[q];
  if (!answer) {
    return res.status(404).json({ error: 'Question not found.' });
  }
  console.log('Received question:', q);

  res.json({ answer });
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
