const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const unfoundPage = require('./middlewares/unfound.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключение к Mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// раздача статики (разметки)
app.use(express.static(__dirname, '/public'));
// роуты к разным путям и несуществующему пути
app.use('/users', users);
app.use('/cards', cards);
app.use(unfoundPage);

// запуск сервера на локальном порте (по-умолчанию localhost:3000)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
