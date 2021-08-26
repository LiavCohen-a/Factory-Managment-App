const express = require('express');
const jwt = require('jsonwebtoken');
const authBL = require('../models/authBL')
const router = express.Router();

router.post('/login',async function(req,resp){
    const userName = req.body.userName;
    const password = req.body.password;
    let isExist =await authBL.isUserExist(userName,password);
    if(isExist.isExist)
    {
        const userID = isExist.userID;
        const RSA_PRIVATE_KEY = "some key";

        var token = jwt.sign({id : userID},
                              RSA_PRIVATE_KEY,
                              {expiresIn : 7200}); //expires in 2 hours

        resp.status(200).send({ auth : true , jwtToken : token ,userId : userID })
    }
    else{
        resp.json({ auth : false , jwtToken : null })
    }
})

module.exports = router;