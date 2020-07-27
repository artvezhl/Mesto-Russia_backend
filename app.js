const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  // TODO delete console.log
  console.log(`App listening on port ${PORT}`);
  console.log(__dirname + '/public');
});