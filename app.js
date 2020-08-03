const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const unfoundPage = require('./middlewares/unfound.js');

app.use(express.static(__dirname, '/public'));
app.use('/users', users);
app.use('/cards', cards);
app.use(unfoundPage);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
