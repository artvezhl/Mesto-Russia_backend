const router = require('express').Router();
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const path = require('path');

const pathToUsers = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const reader = createReadStream(pathToUsers, { encoding: 'utf8' });

  reader.on('error', () => {
    res.status(500).send({ Error: 'Ошибка сервера' });
  });

  reader.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'application-json; charset=utf-8' });
    reader.pipe(res);
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(pathToUsers, 'utf8')
    .then((users) => {
      const currentUser = JSON.parse(users).find((user) => user._id === req.params.id);

      if (!currentUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(currentUser);
    })
    .catch(() => {
      res.status(500).send({ Error: 'Ошибка сервера' });
    });
});

module.exports = router;
