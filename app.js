const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

app.use(express.static(__dirname + '/public'));
// TODO done request to unfound page
// TODO команда npm run dev запускает сервер на localhost:3000 с хот релоудом
app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT, () => {
  // TODO delete console.log
  console.log(`App listening on port ${PORT}`);
});