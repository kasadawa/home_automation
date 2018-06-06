export class Device {
    _id :any ;
    state :boolean;
    gpio: string ; 
    icon: string; 
    type: string; 
    name: string;
    onTimer:boolean; 
    constructor(state:boolean,gpio:string,icon:string,type:string,name:string){
        this.state = state;
        this.gpio = gpio;
        this.icon = icon;
        this.type = type;
        this.name = name; 
        this.onTimer = false ;
    }
}

/* if your on local network type the local IP 
    otherwise  type the global IP                */
export var host = 'http://192.168.100.3:3000';