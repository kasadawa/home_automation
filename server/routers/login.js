var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/',(req,res)=>{
    var username = req.body.name; 
    var password = req.body.password;
    let curPath = path.resolve('./json/user.json');
    var data  = fs.readFileSync(curPath,'UTF-8');
    data = JSON.parse(data);

    //admin credentials 
    let adminUser = data['username'];
    let adminPass = data['password'];
    if((adminUser == username) && (password == adminPass)){
        var token = jwt.sign({ user:  username}, 'cert', { algorithm: 'HS256' });
        res.json(token);
    }else{
        res.json('faild on the server');
    }

})

exports.router = router ; 
