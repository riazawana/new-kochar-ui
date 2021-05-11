import { Component, OnInit,Inject } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import {SocketioSendmsgService} from "../../socketio-sendmsg.service";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommandSettingComponent } from '../../command-setting/command-setting.component';  


export interface UserData {
  sr_no: string;
  name: string;
  config: string;
  action:any;
}


@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})


export class GatewaysComponent implements OnInit {

  arm = false;
  disarm = false;
  relay1on = false;
  relay2on = false;
  relay1off = false;
  relay2off = false;
  refresh = false;
  command_setting = false;
  port_setting = false;

  

  constructor(
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private soc:SocketioSendmsgService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CommandSettingComponent>,
    private router:Router,
  ) {
  }

  gateways:any;
  temp1 = 'NA';
  temp2 = 'NA';   
  ngOnInit() {
    var da = JSON.parse(sessionStorage.getItem('userdata'));
    var role = sessionStorage.getItem('role');

    if(role == 'admin'){
      setTimeout(() => {
         this.arm = true;
      this.disarm = true;
      this.relay1on = true;
      this.relay2on = true;
      this.relay1off = true;
      this.relay2off = true;
      this.refresh = true;
      this.command_setting = true;
      this.port_setting = true;
      });
    }else{
    
      setTimeout(() => {
        var features = JSON.parse(sessionStorage.getItem('features'));
        for(var i = 0; i < features.length; i++){
          // alert(this.arm+",arm")
          // alert(this.disarm+",disarm")
          // alert(this.refresh+",refresh")
          // alert(this.command_setting+",comman")

          if(features[i].feature_name == 'ARM'){
             if(features[i].action == true){
            this.arm = true;
             }
            }
          if(features[i].feature_name == 'DISARM'){

             if(features[i].action == true){
              this.disarm = true;
               }
              }
          if(features[i].feature_name == 'Refresh'){

               if(features[i].action == true){
                this.refresh = true;
                 }
                }
          if(features[i].feature_name == 'Relay 1 ON'){

                if(features[i].action == true){
                  this.relay1on = true;
                   }
                   }
                   if(features[i].feature_name == 'Relay 1 OFF'){

                    if(features[i].action == true){
                      this.relay1off = true;
                       }
                       }
                       if(features[i].feature_name == 'Relay 2 ON'){

                        if(features[i].action == true){
                          this.relay2on = true;
                           }
                           }
          if(features[i].feature_name == 'Relay 2 OFF'){
                   
                   if(features[i].action == true){
                    this.relay2off = true;
                     }
                    }
          if(features[i].feature_name == 'Command Settings'){
                    
                    if(features[i].action == true){
                      this.command_setting = true;
                       }
                      }
          if(features[i].feature_name == 'Port Settings'){
                      
                      if(features[i].action == true){
                        this.port_setting = true;
                         }
                        }
    
          } 
        
        
       }, 1);
    }

    this.backend.getgatewayuserwise()
    .subscribe((data)=> { 
    
      console.log(data)


       this.gateways = data["data"];
   

    });

   
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  /////////////////////////modal 2/////////////////////////////////////
     openDialog(id): void {
       const dialogRef = this.dialog.open(CommandSettingComponent, {
         width: '650px',
         height: '800px',
         data: {id: id}    
       },
       );

       dialogRef.afterClosed().subscribe(result => {
        //  console.log('The dialog  two was closed');
       });
     }
   

  sendMessage(x,y,mac) {
    var data = {
      mac_id:mac,
      type:x,
      value:y
    }
     
   this.soc.sendMsg(data);

   
 }

 port_set(p){
 // console.log("port:",p)
  this.router.navigate(['/kochar/Devices/port_set',JSON.stringify(p)]);

}

 
}

