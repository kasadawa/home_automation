import { Component , Input ,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/ng2-bootstrap';
import { DeviceService } from '../device.service';
import {Device} from '../Device';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent  {
 @Input() device:Device;
  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor(private deviceservice:DeviceService){}
  
  DeleteFunction(){
    this.deviceservice.deleteSingleDevice(this.device._id).subscribe();
    this.hide();
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

}
