const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

app.use(express.static(__dirname + '/public'));

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  // TODO delete console.log
  console.log(`App listening on port ${PORT}`);
});