import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import {SocketioSendmsgService} from "../../socketio-sendmsg.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Location} from '@angular/common';
@Component({
  selector: 'app-port-setting',
  templateUrl: './port-setting.component.html',
  styleUrls: ['./port-setting.component.scss']
})
export class PortSettingComponent implements OnInit {

  constructor(
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private soc:SocketioSendmsgService,
    private router:Router,
    private _location: Location
  ) { }

  alarm:any;
  default:any;
  port_no:any;
  port_no_soc:any;
  name:any;
  sensor_type:any;
  room:any;
  newdata:any;
  temp_status:any;


  ngOnInit(): void {

    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      //console.log("Data in port setting",JSON.parse(params.get("data")));

    this.newdata = JSON.parse(params.get("data"));

    
    this.port_no = this.newdata.port_number;
    this.alarm = this.newdata.alarm_type;
    this.default = this.newdata.default_state;
    this.name = this.newdata.sensor_name;
    this.room = this.newdata.room_name;
    this.sensor_type = this.newdata.sensor_type;

    this.temp_status = this.newdata.default_state
  
    if(this.newdata.sensor_name == "Temp 1"){
      this.port_no_soc = "1"
    }if(this.newdata.sensor_name == "Temp 2"){
      this.port_no_soc = "2"
    }

      })

    this.ngxLoader.stop();

  }

  valuesend : any;


  onsubmit(){

    if(this.newdata.for_temperature != true){
      if((this.port_no == 10)||(this.port_no == 11)||(this.port_no == 12)||(this.port_no == 13)||(this.port_no == 14)){
        this.valuesend = this.port_no+""+this.default+""+this.alarm;
        }else{
        this.valuesend = "0"+this.port_no+""+this.default+""+this.alarm;
        }
         //console.log(this.valuesend);

         this.sendMessage("portsettings",this.valuesend);
         this.newdata.sensor_name =  this.name;

         this.newdata.port_number = this.port_no ;
         this.newdata.alarm_type = this.alarm;
         this.newdata.default_state = this.default;
         this.newdata.sensor_name = this.name;
         this.newdata.room_name = this.room;
         this.newdata.sensor_type = this.sensor_type;
           //console.log(this.newdata);
         this.backend.updatedevice(this.newdata)
         .subscribe((data)=> { 
            //console.log("Data:",data);
            
            if(data["success"] == true){
              this._location.back();

            }
     
         });

    }
      else{
        
        this.valuesend = this.port_no_soc+""+this.temp_status;

        //console.log(this.valuesend);

        this.sendMessage("temperature",this.valuesend);
        this.newdata.sensor_name =  this.name;
        this.newdata.port_number = this.port_no ;
        this.newdata.alarm_type = this.alarm;
        // this.newdata.default_state = this.default;
        this.newdata.sensor_name = this.name;
        this.newdata.room_name = this.room;
        this.newdata.sensor_type = this.sensor_type;
        this.newdata.default_state = this.temp_status;

          //console.log(this.newdata);
        this.backend.updatedevice(this.newdata)
        .subscribe((data)=> { 
           //console.log("Data:",data);
    
         
           
            
           
           if(data["success"] == true){
            this._location.back();

           }
    
    
        });
        
      }

  


  }


  sendMessage(x,y) {
    var data = {
      cmdtype:"iot_gateway_commands",
      mac_id:this.newdata.mac_id,
      type:x,
      value:y
    }

    //console.log(data);
     
   this.soc.sendMsg(data);

   
 }

 cancel(){
  this._location.back();
 }

}
