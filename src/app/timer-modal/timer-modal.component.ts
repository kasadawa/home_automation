import { Component,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DeviceService } from '../device.service';
import {Device} from '../Device';

@Component({
    selector: 'timer-modal',
    templateUrl:"./timer-modal.component.html",
    
})

export class TimerModalComponent{
  @Input() device:Device;
  @Input() buttonStrings:any; 

  
  @ViewChild('lgModal') public lgModal: ModalDirective;



  public devices:any = [] ; 
  public deviceStateString:string = '';

  //for duration module
  public durationH:number = 0 ; 
  public durationM:number = 0 ; 
  public durationS:number = 0 ; 
  public durationResult:number = 0 ;
  //for socket io 
  private socket:any ; 
  constructor(private deviceservice:DeviceService){
    this.devices = this.deviceservice.devices._value ;
    this.socket = this.deviceservice.getSocket();
  }
  ngOnInit(){
        this.socket.on('getTimer', (device:any)=>{   
            this.durationResult = 0 ; 
            for(let index = 0 ; index  < this.devices.length ; index++)
            {
                if(this.devices[index]._id == device._id){
                        this.devices[index].onTimer = device.onTimer;
                        this.devices[index].state = device.state; 
                        this.buttonStrings[index] = device.state ? 'Turn Off' : 'Turn On';
                        break; 
                }
            };
        this.changeDeviceStateString();            
        });

  this.changeDeviceStateString();      
  }

  setTimer(device:any , trigger:boolean){

    let duration = this.getDurationTime();

    if (duration <= 0 )
    { 
      alert("The duration is not properly setted! ")
      return ; 
    }

    // rounding the values
    this.durationH = 0 ; 
    this.durationM = 0 ; 
    this.durationS = 0 ;
    this.durationResult = duration;

    this.device.onTimer = trigger; 
    var data = {
        duration : duration , 
        trigger  : trigger , 
        device   : device, 
    }
    this.socket.emit('setTimer',data);
  }


  getDurationTime(){
    if(this.durationH > 0 || this.durationM > 0 || this.durationS > 0)
    {
      let duration = this.durationH*60*60 + this.durationM*60 + this.durationS ;     
      return Math.round(duration); 
    }

    return -1 ;
  }
  // specific for the modal  
  public show(){
    //workaround for version 2.2.xx
    this.lgModal.config.backdrop = false ;
    this.lgModal.show();   
  }

  public hide():void{
    this.lgModal.config.backdrop = true ;
    this.lgModal.hide();
  }

  changeDeviceStateString(){
    this.deviceStateString = this.device.state == true ? 'Turn off' : 'Turn on';
  }
}
