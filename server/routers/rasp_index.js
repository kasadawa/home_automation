var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//change the line below for your mongodb
var db = mongojs('mongodb://kasadawa:kasadawa@ds133388.mlab.com:33388/mean_appz',['devices']);

exports.db = db ; 

// hardcoded data for raspberry 
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

// initialize array of relays | johny five
// five_relays = [[five.Relay(), deviceObject()],[five.Relay(),deviceObject()],[]];

var five_relays = [] ;
var avaibleGPIOs = [];


function registerDevices(devices){ // can work with multiply devices or with single
    for(var i = 0 ; i < devices.length;i++){
        five_relays.push([new five.Relay(devices[i].gpio.toString()),devices[i]]);
        // checker for device states
        if(devices[i].state) five_relays[five_relays.length - 1][0].open();
        else five_relays[five_relays.length - 1][0].close();
    } 
}


function removeDevices(devices){ // can work with multiply devices or with single
    for(var i = 0 ; i < devices.length;i++){
        for(var g= 0 ; g < five_relays.length;g++){
            if(five_relays[g][1]._id == devices[i]._id){
                five_relays[g][0].close(); 
                five_relays.splice(g, 1);
            }
        }
    } 
}


function updateDevice(id, newState){
    five_relays.forEach((arrObject)=>{
        if(arrObject[1]._id.toString() === id) {
            if(newState == undefined){
                arrObject[1].state = !arrObject[1].state;
                newState = arrObject[1].state;  
            } 
            else arrObject[1].state = newState ;
            newState ? arrObject[0].open() : arrObject[0].close();
        }
    });
}

exports.updateDevice = updateDevice ; 

function checkGPIOavaiblility(devices){
    for(var i = 0 ; i < devices.length;i++){
        for(var g=0 ; g < avaibleGPIOs.length;g++){
            if(devices[i].gpio.toString() === avaibleGPIOs[g]){
                avaibleGPIOs.splice(g,1);
            }
        }
    }
}


//loading the index.html page located in /views folder
router.get('/',(req,res,next)=>{
    console.log('node js loading... index.html')
    
    res.render('./index.html');
});

//Read all devices 
router.get('/all-devices',(req,res,next)=>{
 //this will be returned to the view component
    // need to be changed specific for your case
    avaibleGPIOs = ['P1-11','P1-12','P1-13','P1-16'];
    db.devices.find((err,devices)=>{
        if(err){
            res.send(err);
        }else{
            registerDevices(devices);
            checkGPIOavaiblility(devices);
            var data  = { 'devices':devices,'avaibleGPIO': avaibleGPIOs };
            res.json(data);
        }
    });
});

//Add new  device
router.post('/add-device',(req,res,next)=>{
    var device = req.body;
    // simple check | can be more accurate
    if(!(device.name + '') || !(device.type + '') ){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{ 
        db.devices.save(device,(err,device)=>{
            if(err){
                res.send(err);
            }
            var tmp_arr = [] ; 
            tmp_arr.push(device);
            //because registerDevices wants array
            registerDevices(tmp_arr);
            checkGPIOavaiblility(tmp_arr);
            res.json(device);
        })
    }
    
});

//Delete Single Device
router.delete('/delete-device/:id',(req,res,next)=>{
    db.devices.remove({_id: mongojs.ObjectId(req.params.id)},(err,device)=>{
        if(err){
            res.send(err);
        }else{
            removeDevices(device);
            res.json(device);
        }
    })
});


//Delete All Devices
router.delete('/delete-all-devices',(req,res,next)=>{
    db.devices.remove({},(err,devices)=>{
        if(err){
            res.send(err);
        }else{
            removeDevices(devices);
            res.json(devices);
        }
    })
});


//Turn on/off device
router.put('/sw-device/:id',(req,res,next)=>{
    var cur_device = req.body ;
    var updated_device = {};

    if(!cur_device){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        //here we are changing the device state
        updated_device.state = !cur_device.state;
        
        db.devices.update({_id: mongojs.ObjectId(req.params.id)},{$set: updated_device},{},(err,succ)=>{
            if(err){
                res.send(err);
            }else{
                updateDevice(req.params.id, updated_device.state);
                res.json(updated_device);
            }
        })
    }
});

exports.router = router ; 

