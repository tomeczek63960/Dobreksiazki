const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const productRouter = require('./server/router/productsRouter');
const authRouter = require('./server/router/authRouter');
const paymentRouter = require('./server/router/paymentRouter');
const basketRouter = require('./server/router/basketRouter');

// variables
    const PORT = process.env.PORT || 5000;

// middleware //
    app.use(express.json());
    app.use(cors());
    app.use('/auth/', authRouter );
    app.use('/products/', productRouter );
    app.use("/basket/", basketRouter);
    app.use('/payments/', paymentRouter );

// production
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static('sklep/build'));

        app.get('*', (req,res)=>{
            res.sendFile(path.resolve(__dirname,'sklep','build','index.html'));
        });
    }

// server //
    app.listen(PORT);