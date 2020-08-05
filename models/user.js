const mongoose = require('mongoose');
// TODO Validation
// const assert = require('assert');
require('mongoose-type-url');

// TODO убрать если не понадобится
const urlRegexp = /((https?|http)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)(\w+|\.|\-|\/|\?|\=|\&)*/;

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
    // TODO delete
    // match: urlRegex,
    validate: {
      validator: (v) => urlRegexp.test(v),
      message: (props) => `${props.value} is not a valid link!`
    },
    required: true
  }
});

// TODO Validation
// const User = mongoose.model('user', userSchema);
// const user = new User();
// let error;
//
// user.avatar = 'kldsf./sdgffdghm';
// error = user.validateSync();
// assert.equal(error.errors['avatar'].message,
//   'kldsf./sdgffdghm is not a valid avatar!');
//
// user.phone = '201-555-0123';
// // Validation succeeds! Phone number is defined
// // and fits `DDD-DDD-DDDD`
// error = user.validateSync();
// assert.equal(error, null);

// создание модели пользователя
module.exports = mongoose.model('user', userSchema);
