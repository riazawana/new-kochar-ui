import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../backendconnection.service';
import {SocketioSendmsgService} from "../socketio-sendmsg.service";


@Component({
  selector: 'app-command-setting',
  templateUrl: './command-setting.component.html',
  styleUrls: ['./command-setting.component.scss']
})
export class CommandSettingComponent implements OnInit {
  relay1: any;
  relay2: any;

  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<CommandSettingComponent>,
    private soc:SocketioSendmsgService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    alarm:any;
  default:any;
  port_no:any;
  name:any;
  sensor_type:any;
  room:any;


  relaytriger:any;
  pollingtime:any;

  url:any;


  

  KeyPad:any;  armval:any;  disarmval:any;  Firmware:any;  Calibrate:any;
  Restart:any;
  Reboot:any;

  boot_time :any = "";
    firmwarevirsion :any = "";
    tem_cal_status : any = false;
    ngOnInit(): void {
     
     // console.log(typeof this.data.id)

      alert(this.data.id);
      this.soc.messages.subscribe(msg => {
        console.log(msg);
        if(msg.type == "iot-gateway-command-response"){
            console.log(JSON.parse(msg.text[0]));
            var text = JSON.parse(msg.text[0]);

            if(text.mac_id == this.data.id){
              if(text.type == "getfirmwareversion"){
                 this.firmwarevirsion = text.version;
              }if(text.type == "getrelaystatus"){
                this.relay1 = text.relay1_status;
                this.relay2 = text.relay2_status;
  
              }if(text.type == "getrebootscheduletime"){
                    this.boot_time = text.boot_time;
              }if(text.type == "calibratetemperaturesensor"){
            console.log("calibratetemperaturesensor:",JSON.parse(msg.text[0]));
              }if(text.type == "gettemperaturecalibrationstatus"){
                  this.tem_cal_status = text.temperature_calibration_status
              }
            }
           
           
        }
      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    sendMessage(x,y,mac) {
      var data = {
        mac_id:mac,
        type:x,
        value:y
      }
         console.log(data)
     this.soc.sendMsg(data);
  
     
   }

   routersendMessage(x,mac,rmac,rphone){
    var data = {
      mac_id:mac,
      type:x,
      value: {
        gl_mac : rmac,
        gl_phone : rphone
      }
    }
       console.log(data)
   this.soc.sendMsg(data);

   }

    

}
