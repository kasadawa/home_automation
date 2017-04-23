import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../device.service';
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html'
})
export class AdvancedComponent implements OnInit {
  public username:any;
  public password:any;
  public pins:any;  
  public apiKey:any;
  constructor(private devservice:DeviceService){ }

  ngOnInit() {
  }
  setCredentials(username:any,password:any){
    if(username.length == 0 && password.length == 0){
      alert('please dont left the fields empty')
    }else{
      this.devservice.setCredentials(username,password);
    }
  }
  setApiKey(key:any){
    this.devservice.setApiKey(key);
  }

}
