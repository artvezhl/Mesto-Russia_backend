const CardsRouter = require('express').Router();
const cards = require('../data/cards.json');

CardsRouter.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = CardsRouter;