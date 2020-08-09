const jwt = require('jsonwebtoken');

 const authentication = async ( req, res, next ) =>{

    const authHeader = req.headers['token'];

    if( authHeader == null ) return res.status( 401 ).send( { msg: "Brak dostępu" } );
    
    try{

        const verified = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();

    }catch(err){
    
        res.status(400).send({msg:"Invalid token"});
   
    }

}

exports.authentication = authentication;