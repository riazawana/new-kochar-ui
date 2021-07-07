import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../backendconnection.service';
import {SocketioSendmsgService} from "../socketio-sendmsg.service";

@Component({
  selector: 'app-command-setting-smartmeter',
  templateUrl: './command-setting-smartmeter.component.html',
  styleUrls: ['./command-setting-smartmeter.component.scss']
})
export class CommandSettingSmartmeterComponent implements OnInit {

  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<CommandSettingSmartmeterComponent>,
    private soc:SocketioSendmsgService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    setaddress:any;
    metertype:any;





    ngOnInit(): void {
     // console.log(typeof this.data.id)
      // alert(this.data.id)

      this.soc.messages.subscribe(msg => {
        //console.log(msg);
        if(msg.type == "modbus_command_response"){
            //console.log(JSON.parse(msg.text[0]));
            var text = JSON.parse(msg.text[0]);

        
           
           
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
        meter_type:this.metertype,
        value:y
      }
       
     this.soc.sendMsg(data);
  
     
   }

   get(x,y){

   }

    

}
