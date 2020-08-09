const mongoose = require('../index');
const { bookSchema,bookInBasketSchema } = require('../schema/productSchema');

exports.bookModel = mongoose.model('book',bookSchema);
exports.bookInBasketModel = mongoose.model('boook in basket',bookInBasketSchema);