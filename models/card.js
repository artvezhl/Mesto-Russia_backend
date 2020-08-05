const mongoose = require('mongoose');

// создание экземпляра схемы с необходимыми полями
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  link: {
    type: String,
    // валидация ссылки
    validate: {
      validator: function(v) {
        return /(http:\/\/|https:\/\/)((([a-z]+(\.|-))+[a-z]+)|(\d\.\d\.\d\.\d))(:(([1-5][0-9]{1,4})|(6[0-4][0-9]{3})|(65[0-5][0-3][0-6])|([1-9][0-9]{3})|([1-9][0-9]{2})|([1-9][0-9])|([1-9])))?\/?(\w*|(\/|#))*/.test(v);
      },
      message: props => `${props.value} is not a valid link!`
    },
    required: [true, 'Link is required']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// создание модели карточки
module.exports = mongoose.model('card', cardSchema);
