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