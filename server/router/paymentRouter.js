const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/checkout',async (req,res)=>{

    let err;
    let status;
    const { product, token } = req.body;
    
    try{

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const idempotencyKey = Math.random() * 10000000000;
        const charge = await stripe.charges.create({

            amount:product.price * 100,
            currency: 'PLN',
            customer:customer.id,
            receipt_email: token.email,
            description: "Purchased for meee",
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }
            },
            {
                idempotencyKey
            } 
        );

        status = 'success'
        res.json({err,status});

    }catch(err){
        status = 'failure'
        res.json({ err, status } );
    }
    
})

module.exports = router;