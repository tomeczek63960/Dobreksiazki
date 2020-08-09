const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { validateAuth } = require("../validation");
const { loginModel } = require('../mongoose/model/authModel');

const jwt = require('jsonwebtoken');

router.post("/login",async (req,res) => {

    const { email, password } = req.body;

    const validationResult = validateAuth({ email, password });
    if(validationResult.error) return res.status(400).send( { msg : validationResult.error.details[0].message } );

    try{
        const isMatchingUser = await loginModel.find( { email } );
        if( !isMatchingUser[0] ) return res.status(404).send( { msg: "Nie ma takiego uzytkownika" } );

        const isMatchingPassword = await bcrypt.compare( password,isMatchingUser[0].password );
        if( !isMatchingPassword ) return res.status(400).send( { msg: "Hasło nie jest poprawne" } );

        const user = {email : email}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json( { token: accessToken } );

    }catch(err){
        res.status(500).send({msg:err.message || "Problemy z serverem"});
    }

});

router.post('/register',async (req,res) => {

    const { email, password, passwordConfirm } = req.body;

    const validationResult = validateAuth( { email, password ,passwordConfirm } );
    if( validationResult.error ) return res.status(400).send( { msg : validationResult.error.details[0].message } );

    try{
        const isEgsistingLogin = await loginModel.find( { email } );
        
        if( isEgsistingLogin[0] ) return res.status(401).send( { msg: "Podany login już istnieje" } );
        if( password !== passwordConfirm ) return res.status(400).send( { msg: "Podane hasła nie są zgodne" } );
        

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
  
        const newUser = new loginModel({
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.send({msg:"Konto utworzone pomyślnie"});

    }catch(err){
        res.status(500).send({msg:"Problemy z serverem"});
    }

});

module.exports = router;