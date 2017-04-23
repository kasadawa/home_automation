import {Injectable} from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import { Device } from './Device';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable()
export class DeviceService{


    /* https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md */
    public devices:any = new BehaviorSubject([]); 
    public raspiPins:any = new BehaviorSubject([]); 

    private options:RequestOptions ; 
    private socket:any = null;

    /* if your on local network type the local IP 
      otherwise  type the global IP                */
    //initialize variables
    private host = 'http://localhost:3000';

    constructor(private http:Http){
        this.socket = io(this.host);
        console.log('device service');

        //TODO remove
        this.http = http ;
        var headers = new Headers({'Content-Type':'application/json'});
        this.options = new RequestOptions({headers:headers});

        this.getDevices();
    }

    //serving all devices
    getDevices(){ 
        return  this.http.get(this.host + '/all-devices').map(res=>res.json())
                .subscribe((res)=>{
                    this.devices.next(res.devices);
                    this.raspiPins.next(res.avaibleGPIO);
                });
    }

    //changing device state (on/off)
    switchDeviceState(device:Device){
        return this.http.put(this.host +'/sw-device/'+ device._id ,JSON.stringify(device),this.options)
            .map(res => res.json());
    }


    // adding new device
    addDevice(device:Device) {
        return this.http.post(this.host +'/add-device',JSON.stringify(device),this.options)
           .map(res => res.json());
    }

    // delete current device from _id
    // you can pass a object and to eliminate the for loop 
    deleteSingleDevice(_id:any){
        var key = -1; 
        for(let i = 0; i < this.devices._value.length;i++){
            if(this.devices._value[i]._id === _id){
                key = i ; 
                break ; 
            }
        }
        
        if(key !== -1){
            var tmpDeviceArray = this.devices._value ;

            this.raspiPins.next(this.helpGPIO(this.devices._value[key]));
          
            //with this way we will call subscribe method
            tmpDeviceArray.splice(key,1);
            this.devices.next(tmpDeviceArray);


            return this.http.delete(this.host +'/delete-device/'+ _id )
                .map(res => res.json());
        } 

    }

    
    // deleting all devices
    deleteAllDevices(){

        this.raspiPins.next(this.helpGPIO(this.devices._value));
        this.devices.next([]);

        return this.http.delete(this.host +'/delete-all-devices')
                .map(res => res.json());
    }

    helpGPIO(devices:any){
        var gpioArray = this.raspiPins._value ;
        var deviceArray:any = [] ; 
        // converting one device to array item
        if(!(devices instanceof Array)){
           deviceArray.push(devices);
        }else{ deviceArray = devices};

        for(var i = 0 ; i < deviceArray.length ;i++){
            gpioArray.push(deviceArray[i].gpio);
        }
        return gpioArray ; 
    }

    //post request for timer
    setTimer(duration:any,trigger:boolean,device:any) {
        console.log("setTimer function in the device.service");
        var data = {
             duration: duration,
             trigger: trigger,
             device: device
            };
         
        return this.http.post(this.host +'/set-timer/' + device._id.toString(),JSON.stringify(data),this.options)
          .map(res => res.json());
    }


    //passing the socket variable to timer-modal 
    getSocket(){
        return this.socket;
    }
}