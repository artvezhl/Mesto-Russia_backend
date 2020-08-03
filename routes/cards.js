const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const pathTocards = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  const reader = fs.createReadStream(pathTocards, { encoding: 'utf8' });

  reader.on('error', () => {
    res.status(500).send({ Error: 'Ошибка сервера' });
  });

  reader.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'application-json; charset=utf-8' });
    reader.pipe(res);
  });
});

module.exports = router;
