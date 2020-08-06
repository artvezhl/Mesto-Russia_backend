const mongoose = require('mongoose');

const urlRegexp = /((https?|http)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)(\w+|\.|\-|\/|\?|\=|\&)*/;

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
    // валидация ссылки TODO сделать единообразно с юзерами
    validate: {
      validator: (v) => {
        console.log('МЫ В ВАЛИДАТОРЕ КАРТОЧКИ!!!');
        return urlRegexp.test(v);
      },
      message: (props) => {
        console.log('МЫ В СООБЩЕНИИ ОБ ОШИБКЕ ВАЛИДАТОРА КАРТОЧКИ!!!', props.value);
        return `${props.value} is not a valid link!`;
      },
    },
    required: true
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
