var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var sjcl = require('sjcl');

router.post('/',(req,res)=>{
    var username = req.body.name; 
    var password = req.body.password;

    var userData =fs.readFileSync('./json/user.json','UTF-8');
    userData = JSON.parse(userData);
    var adminUser = userData.username; 
    var decryptedPassword = sjcl.decrypt("password",userData.password);
    if((adminUser == username) && (password == decryptedPassword)){
        var token = jwt.sign({ user:  username}, 'cert', { algorithm: 'HS256' });
        res.json(token);
    }else{
        res.json('faild on the server');
    }

})

exports.router = router ; 
