import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit {
  public alertFlag:boolean = false;
  public alertMessage:string = ''; 
  public blockFlag:boolean = false ;
  constructor(private auth:AuthenticationService , private router:Router) {
      if(this.auth.isAuthenticated()) this.router.navigate(['/home']);     
      
      let tmp_counter = localStorage.getItem('error_counter'); 
      if(tmp_counter != null)
      {
        this.blockFlag= true; 
        setTimeout(()=>{this.blockFlag = false},60*1000);
      }

      let tmp_err = localStorage.getItem('error');
      if(tmp_err != null )
      {
        if(tmp_counter != null) tmp_err += ' ( you need to wait 60 second until next try )'

        this.alertFlag = true ;
        this.alertMessage = tmp_err;
      }
   }

  ngOnInit() {
  }

}
