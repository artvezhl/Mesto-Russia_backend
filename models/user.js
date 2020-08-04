const mongoose = require('mongoose');

// создание экземпляра схемы с необходимыми полями
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  avatar: {
    type: String,
    required: true
  }
});

// создание модели пользователя
module.exports = mongoose.model('user', userSchema);
