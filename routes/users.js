const usersRouter = require('express').Router();
// const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  // const userspath = path.join(__dirname, 'users.json');
  // if (!users[req.params.id]) {
  //   res.status(404).send({ "message": "Нет пользователя с таким id" });
  // }
  // res.send(users[req.params.id]);
  // fs.createReadStream(users, { encoded })
  res.send(users);
});

module.exports = usersRouter;