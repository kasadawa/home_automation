// because the node js version is 4.7.2
"use strict";

// for socket io 
var server = require('../server');
var io = server.io;
var http = server.http; //to remove

//for mongodb
var mongojs = require('mongojs');
var router = require('../routers/rasp_index');


class Timer{
    constructor(duration,device){
        this.device = device;
        this.id = device._id;
        this.duration = duration ;
        this.remaining = duration ; 
        this.timeoutID = 0 ; 
    }
    setTimer(callback,flag){
        this.updateDeviceTimer(flag);

        if(flag){
            this.intervalID = setInterval(()=>{
                this.remaining -= 1;
                console.log("remaining "+ this.remaining + " seconds");
            },1000);

            this.timeoutID = setTimeout(()=>{
                clearInterval(this.intervalID);
                // this.changeDeviceState();
                console.log("timer finished after "+ this.duration);

                this.updateDeviceTimer(!flag); 

                callback(this.device);
            },this.duration*1000);
            return; 
        }

        console.log('interruped timer');        
        clearTimeout(this.timeoutID);
        clearInterval(this.intervalID);

        //response with the previous state
        callback(this.device);
    }

    //getting current device and setting it to a different state. 
    updateDeviceTimer(value){
        this.device.onTimer = value ;
        if(!value){
            router.updateDevice(this.device._id, undefined);
            this.device.state = !this.device.state; // if the value is false  
        }
        //update both staten and timer 
        var db_devices = router.db.devices; 
        //special object for mongojs.update
        var tmpDevice = { state :undefined , onTimer:undefined} ;         
        tmpDevice.onTimer = this.device.onTimer; 
        tmpDevice.state = this.device.state;
        db_devices.update({_id: mongojs.ObjectId(this.device._id)},{$set: tmpDevice},{},(err,device)=>{if(err)throw(err)});
    }

    interrupTimer(callback){
        this.setTimer(callback) ; 
    }
}
// usefull for the function below 
var TimerArray = []; 

// function for returning the status 
var getTimer = (device) =>{
    io.emit('getTimer',device);
}; 
io.on('connection', function(socket){
    // getting the status or intteruption
    socket.on('setTimer', function(data){
        var trigger = data.trigger; 
        var device = data.device ; 
        var duration = data.duration;
        if(trigger == false){
            timeHelper(getTimer,device); 
        }else{
            TimerArray[device._id] = new Timer(duration,device);
            TimerArray[device._id].setTimer(getTimer,trigger);
        }
    });
});

function timeHelper(callback,device){
    if(TimerArray[device._id] !== undefined){
        TimerArray[device._id].interrupTimer(callback);  
    } 
    else callback(device);
}
