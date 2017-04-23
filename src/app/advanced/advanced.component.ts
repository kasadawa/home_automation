import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html'
})
export class AdvancedComponent implements OnInit {
  public username:any;
  public password:any;
  public pins:any;  
  public apiKey:any;
  constructor() { }

  ngOnInit() {
  }

}
