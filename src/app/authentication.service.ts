import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import {Http} from "@angular/http";
import {Headers,RequestOptions} from "@angular/http";
import 'rxjs';
// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthenticationService {
  private header:any;
  private options:any;

  //change the host name based on your local IP 
  private host = 'http://192.168.100.6:3000';
  constructor(private router: Router, private authHttp:AuthHttp, private http:Http) {
    this.header = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers:this.header});
  }



  public login(username: string, password: string){

      this.http.post(this.host + '/login',{name:username,password:password},this.options).map(res => res.json())
        .subscribe(
          token =>{
            this.setUser(token);
            this.router.navigate(['/home']);
          },
          err => console.log(err)
        );
  }
 
  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired('jwt_token');
  }

  public logout(){
    // Remove token from localStorage
    localStorage.removeItem('jwt_token');
  }

  private setUser(token:any): void {
    localStorage.setItem('jwt_token', token);
  }
}