import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { AddDevicesComponent } from '../add-devices/add-devices.component';
import { GetDevicesComponent } from '../get-devices/get-devices.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthenticationService) {}

  ngOnInit() {
  }

}
