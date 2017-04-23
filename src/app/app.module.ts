import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AddDevicesComponent } from './add-devices/add-devices.component';
import { GetDevicesComponent } from './get-devices/get-devices.component';

import { TabsModule ,TimepickerModule,ModalModule } from 'ngx-bootstrap';
import {DeviceService} from './device.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { TimerModalComponent } from './timer-modal/timer-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MonitorComponent } from './monitor/monitor.component';
import { AdvancedComponent } from './advanced/advanced.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'jwt_token',
		tokenGetter: (() => sessionStorage.getItem('jwt_token')),
  }), http, options);
}

//For routes
const mainRoutes:Routes= [
  {path: 'home', component:HomeComponent},
  {path: '', redirectTo:'/home',pathMatch: 'full'},
  {path: 'login', component:AuthenticationComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    AddDevicesComponent,
    GetDevicesComponent,
    TimerModalComponent,
    DeleteModalComponent,
    MonitorComponent,
    AdvancedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(mainRoutes),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    Angular2FontawesomeModule,
    ModalModule.forRoot()
  ],
  providers: [    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthenticationService,
    DeviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
