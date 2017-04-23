import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../device.service';
import {Device} from '../Device';
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html'
})
export class AddDevicesComponent implements OnInit {

    public deviceName= ''; // used in the .html file
    public itemTypes = ['lamp','switch','contact','relay'];
    public raspiPins:any = []; // those pins are declared in index.js
    //default selected
    public selectedDevice = 'lamp';
    //default selected pin 
    public selectedPin = '';
    ngOnInit(){
        this.deviceservice.raspiPins.subscribe((res:any) =>{
            this.raspiPins = this.sortGPIO(res);
            this.selectedPin = this.raspiPins[0]; 
        });
    }
    constructor(private deviceservice:DeviceService){}
    

    addDevice(name:string){
        if(name.length !== 0 && this.selectedPin === ''){
            alert('There are no GPIO pin avaible !');
        }
        
        if(name.length !== 0 && this.selectedPin !== ''){
            var icon = document.getElementById("icon-prop");
            var deviceObj = new Device(false,
                            this.selectedPin.toString(),
                            icon.className.toString(),
                            this.selectedDevice.toString(),
                            name);

            this.deviceservice.addDevice(deviceObj)
                .subscribe(device =>{
                   var tmpDeviceArray = this.deviceservice.devices._value ; 
                   var i = this.raspiPins.indexOf(device.gpio);
                   var tmpDeviceGPIO  = this.raspiPins;
                   tmpDeviceGPIO.splice(i,1);
                 
                   //with this way we will call subscribe method
                   tmpDeviceArray.push(device);
                   this.deviceservice.devices.next(tmpDeviceArray);

                   //this will calll raspiPins subscribe method
                   this.deviceservice.raspiPins.next(tmpDeviceGPIO);
                });
        }
        this.deviceName = '';
    }
    //helper function used in ngOnInit
    sortGPIO(result:any){
        if (result.length === 0 )  return ['']; 
        for(let i = 0; i < result.length; i++){
            var current = Number(result[i].substring(3)) ; 
            for(let g = i + 1 ; g < result.length ; g++ ){
                var selected = Number(result[g].substring(3)) ; 
                if(current > selected ){
                    let tmp =  result[i];
                    result[i] =  result[g];
                    result[g] = tmp;  
                }
            }
        }
        return result ; 
    }
    

    // change class property
    changeIcon(){
            var icon = document.getElementById("icon-prop");
            switch(this.selectedDevice){
                case "lamp":
                    icon.className = "fa fa-lightbulb-o";
                    break;
                case "switch":
                    icon.className = "fa fa-random";
                    break;
                case "contact":
                    icon.className = "fa fa-plug";
                    break;
                case "relay":
                    icon.className = "fa fa-home";
                    break;
            }                
    }
}