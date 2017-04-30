import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../device.service';
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html'
})
export class AdvancedComponent implements OnInit {
  public username:any;
  public password:any;
  public apiKey:any;
  public pinList:any[]; 
  public pin:any;  
  constructor(private devservice:DeviceService){
      this.username = '';
      this.password = '';  
  }

  ngOnInit() {
    this.getPinList();
  }
  setCredentials(username:any,password:any){
    if(username.length == 0 && password.length == 0){
      alert('please dont left the fields empty')
    }else{
      this.devservice.setCredentials(username,password);
      this.username = '';
      this.password = '';
    }
  }
  setApiKey(key:any){
    this.devservice.setApiKey(key);
    this.apiKey = '';
  }

  getPinList(){
    this.devservice.getPinsList(this.pinList).subscribe(res=>{
      this.pinList = res;
      this.pin = this.pinList[0]; 
    });
  }
  updatePinList(selectedValue:any){
    this.devservice.updatePinList(selectedValue).subscribe(res=>{
      if(res.toString() === 'success')
      {
        console.log('success')
      }
    });
    var index = this.pinList.indexOf(selectedValue);
    this.pinList.splice(index,1);

    this.pin = this.pinList[0]; 

  }
  addPin(pin:any)
  {

  }
}
