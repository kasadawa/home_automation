import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { AddDevicesComponent } from '../add-devices/add-devices.component';
import { GetDevicesComponent } from '../get-devices/get-devices.component';
import { DeviceService } from '../device.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private socket:any ; 
  constructor(private deviceservice:DeviceService, private auth:AuthenticationService) {
    this.socket = this.deviceservice.getSocket();
  }

  ngOnInit() {
    this.socket.on('alertMagnetSensor', (status:any)=>{ 
      console.log(status);
    });
  }


}



      