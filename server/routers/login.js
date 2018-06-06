var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var sjcl = require('sjcl');

var err_counter = 0 ; 
router.post('/',(req,res)=>{
    var username = req.body.name; 
    var password = req.body.password;

    var userData =fs.readFileSync('./json/user.json','UTF-8');
    userData = JSON.parse(userData);
    var adminUser = userData.username; 
    var decryptedPassword = sjcl.decrypt("password",userData.password);
    if((adminUser == username) && (password == decryptedPassword)){
        if(err_counter !== 0 )err_counter = 0 ;

        var token = jwt.sign({
            user:  username,
            exp: Math.floor(Date.now() / 1000) + (60*60*3)
        }, 'cern', { algorithm: 'HS256' });
        res.json({"token":token});
    }else{
        var data = {"err":"Invalid username/password pair"}; 
        err_counter ++ ;
        if(err_counter >= 3) data.counter = true;
        res.json(data);
    }

})

exports.router = router ; 
