const mongoose = require('../index');

const bookSchema = mongoose.Schema({

    title:String,
    author:String,
    img:String,

    category:String,
    description:String,
    price:Number,

    discount:Number,
    rates:Number,
    opinionAmount:Number,

    pages:Number,
    cover:String,
    languages:String,
    publishingHouse:String

},{ collection: "books" } );

const bookInBasketSchema = mongoose.Schema({
    ...bookSchema.obj,

    amountInBasket:Number,
    user:String

},{ collection:'basketBooks' });

exports.bookSchema = bookSchema;
exports.bookInBasketSchema = bookInBasketSchema;