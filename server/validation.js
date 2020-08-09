const Joi = require('@hapi/joi');

const validateBook = (book) =>{

    const bookSchema = Joi.object({
        // do autentykacji
        user:Joi.string().optional(),

        _id:Joi.string().optional(),
        title:Joi.string().required(),
        author:Joi.string().required(),
        img:Joi.string().required(),

        category:Joi.string().required(),
        description:Joi.string().required(),
        discount:Joi.number().required(),
        
        price:Joi.number().positive().required(),
        rates:Joi.number().required(),
        opinionAmount:Joi.number().required(),
        amountInBasket:Joi.number().positive().optional(),

        pages:Joi.number().positive().required(),
        languages:Joi.string().required(),
        cover:Joi.string().required(),
        publishingHouse:Joi.string().required()

    });
    return bookSchema.validate(book);
};

const validateAuth = (auth) =>{

    const authSchema = Joi.object({

        email:Joi.string().email().min(3).max(255).required(),
        password:Joi.string().min(5).max(255).required(),
        passwordConfirm:Joi.any().valid(Joi.ref('password')).optional()
    
    });

    return authSchema.validate(auth);
}

exports.validateBook = validateBook;
exports.validateAuth = validateAuth;
// POPRAWIONE NA CACY