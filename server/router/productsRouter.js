const router = require('express').Router();
const { bookModel } = require('../mongoose/model/productModel');

router.get('/fetch-type-products' , async (req,res) => {
    const { body } = req.headers;
    const filter = body ? JSON.parse(body) : {};

    try{    
        const books = await bookModel.find(filter);
        res.send(books);
        
    }catch(err){
        res.status(500).send({msg:"Problemy po stronie servera"})
    }
});

router.get('/fetch-product/:_id' , async (req,res) => {
    try{
        const book = await bookModel.find( { _id : req.params._id } );
        if( !book[0] ) return res.status(404).send({msg:'Nie znaleziono produktu w bazie danych'});
            
        res.send(book);
        
    }catch(err){
        res.status(500).send( { msg : "Problemy po stronie servera" } );
    }
});

router.get('/find-matching-books/:filter', async ( req, res ) =>{

    let { filter } = req.params;
    filter = filter.split(' ');

    filter.forEach((word,idx)=>{
        if(word.length === 1) return;
    
        const firstLetter = word.charAt(0).toUpperCase();
        word = word.slice(1);
        word = `${firstLetter}${word}`

        filter[idx] = word;
    })
    filter = filter.join(' ');

    try{
        const matchingBooks = await bookModel.find({$or:
            [ 
                { title:  { "$regex": filter, "$options": "i" } }, 
                { author:  { "$regex": filter, "$options": "i" }  },
                { category:  { "$regex": filter, "$options": "i" }  } 
            ]
         } );
         res.send(matchingBooks);
    }catch(err){
        res.status(400).send( { msg: err.response} );
    }

});

router.get('/fetch-home-products' , async (req,res) => {
    try{
        const opinionAmount = await bookModel.find( {} ).sort( { opinionAmount: -1 } ).limit( 20 );
        const rates = await bookModel.find( { rates: { $gt: 4 } } );
        const discount = await bookModel.find( { discount: { $gt: 0 } } );
        
        res.send( { opinionAmount, rates, discount } );
    }catch(err){
        res.status(500).send({msg:"Problemy po stronie servera"})
    }
});

module.exports = router;