const router = require('express').Router();
const mongoose = require('../mongoose/index')

const { validateBook } = require('../validation.js');
const { bookInBasketModel } = require('../mongoose/model/productModel');

const { authentication } = require('../middleware/authentication');

router.get('/fetch-products',authentication , async (req,res) => {
    const user = req.user.email;
    try{
        const booksInBasket = await bookInBasketModel.find({user});
        res.send(booksInBasket);
        
    }catch(err){
        res.status(500).send( { msg : "Problemy po stronie servera" } );
    }
});

router.post('/add-product',authentication, async (req,res) => {
    const book = req.body;
    const user = req.user;

    const filter = { title : book.title ,user: user.email};
    const result = validateBook( book );
    if( result.error ) return res.status(400).send( { msg : result.error.details[0].message } );

    try{
        
        const isThisBookInBasket = await bookInBasketModel.find(filter);
        if( isThisBookInBasket[0] ) {
           
            const update = { amountInBasket:  isThisBookInBasket[0].amountInBasket + 1 };
            const updatedBook = await bookInBasketModel.findOneAndUpdate( filter, update );
            return res.send( { msg:'Zwiększono ilość w koszyku', addedProduct:updatedBook } );
        }
        var newId2 = new mongoose.mongo.ObjectId();

        book.amountInBasket = 1;
        book.user = user.email;
        book._id = newId2;

        const newBookInBasket = new bookInBasketModel( book );
        const saved = await newBookInBasket.save();

        res.send({msg:"Dodano do koszyka", addedProduct:saved});

    }catch(err){
        res.status(500).send({msg: "Problemy po stronie servera" });
    }

});

router.put('/change-amount',authentication,async (req,res) => {
    const user = req.user.email;
    const {title, amountInBasket} = req.body;
    try{
        const updated = await bookInBasketModel.findOneAndUpdate({title, user},{amountInBasket});
        if( !updated ) return res.status(404).send( { msg : "Nie znaleziono produktu w koszyku" } );

        res.send({msg:"Zwiększono ilość w koszyku"});

    }catch(err){
        res.status(500).send({msg: "Problemy po stronie servera" });
    }

});

router.delete('/remove-product/:title',authentication,async (req,res) => {
    const user = req.user.email
    const {title} = req.params;
    try{
        
        const removedBook = await bookInBasketModel.findOneAndDelete({title, user});
        if( !removedBook ) return res.status(404).send({ msg:"Nie znaleziono produktu w koszyku" });
        
        res.send({msg: "Produkt został usunięty z koszyka" });

    }catch(err){
        res.status(500).send({msg: "Problemy po stronie servera" });
    }
});

router.delete('/remove-all-products',authentication,async (req,res)=>{

    const user = req.user.email;

    try{
        const deleted = await bookInBasketModel.deleteMany( { user } );
        res.send({msg:'removed'});

    }catch(err){
        res.send({msg:"Problemy po stronie servera"})
    }
});

module.exports = router;