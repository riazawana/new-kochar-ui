import { Component, OnInit,Inject, Type } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../backendconnection.service';
import {SocketioSendmsgService} from "../socketio-sendmsg.service";

@Component({
  selector: 'app-command-setting-meter',
  templateUrl: './command-setting-meter.component.html',
  styleUrls: ['./command-setting-meter.component.scss']
})
export class CommandSettingMeterComponent implements OnInit {


  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<CommandSettingMeterComponent>,
    private soc:SocketioSendmsgService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    pinginterval1:any;
    pinginterval2:any;

    pingurl1:any;
    pingurl2:any;


    enableapm:any;

    relaystatus:any;

    firmwarevirsion1:any;
    firmwarevirsion2:any;



    getping_url:any;
    getfirmware:any;
    getping_interval:any;
    getrelaystatus:any;


    ngOnInit(): void {
     // console.log(typeof this.data.id)
      // alert(this.data.id)

      this.soc.messages.subscribe(msg => {
        console.log(msg);
        if(msg.type == "modbus-command-response"){
        

            console.log(JSON.parse(msg.text[0]));
            var text = JSON.parse(msg.text[0]);

            if(text.mac_id == this.data.id){
              if(text.type == "getfirmwareversion"){
                 this.getfirmware = text.version;
              }if(text.type == "getrelaystatus"){
                this.getrelaystatus = text.relaystatus;
  
              }if(text.type == "getpollingurl"){
                    this.getping_url = text.url;
              }if(text.type == "getpollingtime"){
                this.getping_interval = text.pollingtime;
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
        cmdtype:"modbus_commands",
        mac_id:mac,
        version:this.data.v,
        type:x,
        value:y
      }
       
     this.soc.sendMsg(data);
  
     
   }

   get(x,y){
    var data = {
      cmdtype:"modbus_commands",
      mac_id:y,
      version:this.data.v,
      type:x,
      value:0
    }
     
   this.soc.sendMsg(data);

   }

    

}
