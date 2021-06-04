import { Component, OnInit,Inject } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {SocketioSendmsgService} from "../../socketio-sendmsg.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommandSettingComponent } from '../../command-setting/command-setting.component';  
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { RelaychangeModalComponent } from '../../device/relaychange-modal/relaychange-modal.component';  
import { NgxUiLoaderService } from 'ngx-ui-loader';


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



////////////////////////////////////////////////////////////////////////////////////////////////


id:string;
   idz:any;
   gateway:any;
   faMapMarker = faMapMarkerAlt;
   panelOpenState = false;
   constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private soc:SocketioSendmsgService,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    public dialogRef: MatDialogRef<CommandSettingComponent>,
    public dialogRef2: MatDialogRef<RelaychangeModalComponent>,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    arm = false;
    disarm = false;
    relay1on = false;
    relay2on = false;
    relay1off = false;
    relay2off = false;
    refresh = false;
    command_setting = false;
    port_setting = false;


  

   onNoClick(): void {
    this.dialogRef.close();
  }


  /////////////////////////modal 2/////////////////////////////////////
     openDialog(id,rmac,rnum): void {
       const dialogRef = this.dialog.open(CommandSettingComponent, {
         width: '650px',
         height: '800px',
         data: {id: id,rmac:rmac,rnum:rnum}    
       },
       );

       dialogRef.afterClosed().subscribe(result => {
        //  console.log('The dialog  two was closed');
       });
     }
   
 

 

  getdata(){
    this.temparray = [];
  
       this.backend.getiotgatewaylist()
       .subscribe((data)=> { 
    this.ngxLoader.stop();
           console.log("All gateway:",data["data"]);
          this.gateway = data["data"];
        
           
          for(var i = 0; i < this.gateway.length;i++){
            var gs = this.gateway[i].gateways;
            // console.log("array1d:",gs);
             this.temparray.push([]);
            for(var k = 0; k < gs.length; k++){
              // console.log("temp:",gs[k].temp);

              if(gs[k].temp.length != 0 ){
                // console.log("array2dif:",gs[k].temp);

                var val = gs[k].temp[0].value.split("");
                this.temparray[i].push(
                  {
                    temp1:val[29]+""+val[30]+""+val[31]+""+val[32],
                    temp2:val[33]+""+val[34]+""+val[35]+""+val[36],
                    relay1:gs[k].temp[0].relay1_satus,
                    relay2:gs[k].temp[0].relay2_satus
                   })
              }else{
                // console.log("array2dels:",gs[k].temp);
                this.temparray[i].push([])
              }
             
            }
          }


       });
  }

  get(){
    console.log(this.temparray);
  }

  temparray:any = [];



 port_set(p){
   this.router.navigate(['/kochar/Devices/port_set',JSON.stringify(p)]);

 }


 addgatways(){
  this.router.navigate(['/kochar/Devices/addgateway',this.idz,this.id]);
 }

 edit(x,y){
 
 }
  


refreshtemp(){
  this.getdata();
} 


relay1ons: boolean = false;
relay1offs: boolean = true;
relay2ons: boolean = false;
relay2offs: boolean = true;
macsingle: string;
clisingle: string;


onNoClick2(): void {
 this.dialogRef2.close();
}



  macid:any;
  singleGatewayList: boolean = false;
ngOnInit(): void {

  this.ngxLoader.start();


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
   
   this.getdata();


   this.soc.messages.subscribe(msg => {
     console.log(msg);
     if(msg.type == "iot-gateway-command-response"){
         console.log(JSON.parse(msg.text[0]));
         var text = JSON.parse(msg.text[0]);
//           alert(1);
// alert(this.macid);
// alert(text.mac_id );

         if(text.mac_id == this.macid){
           // alert(1);
          if(text.type == "getrelaystatus"){
           // alert(2);

              if(text.relay1_satus == true){
           // alert(3);
               this.relay1ons = true;
               this.relay1offs = false;
              }if(text.relay1_satus == false){
           // alert(4);
               this.relay1ons = false;
               this.relay1offs = true;
              }
              if(text.relay2_satus== true){
           // alert(5);
               this.relay2ons = true;
               this.relay2offs = false;
              }if(text.relay2_satus == false){
           // alert(6);
               this.relay2ons = false;
               this.relay2offs = true;
              }
               // alert("this.relay1ons:"+this.relay1ons)
               // alert("this.relay1offs:"+this.relay1offs)
               // alert("this.relay2ons:"+this.relay2ons)
               // alert("this.relay2offs:"+this.relay2offs)

           }
         }
        
        
     }
   })

}
macs(macs: any) {
 throw new Error('Method not implemented.');
}



sendMessage(x,y,mac) {
 var data = {
   mac_id:mac,
   type:x,
   value:y
 }   
 this.macid = mac;
 console.log(data);
this.soc.sendMsg(data);
this.getdata();
alert("Command executed succesfully")
}






delete(x,y){




 Swal.fire({
   title: 'Are you sure?',
   text: 'You will not be able to recover this Gateway!',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonText: 'Yes, delete it!',
   cancelButtonText: 'No, keep it'
 }).then((result) => {
   if (result.value) {

      this.backend.deleteiotgateway(x,y)
.subscribe((data)=> { 

 //  console.log(data);
 this.getdata();
 Swal.fire(
   'Deleted!',
   'Gateway has been deleted.',
   'success'
 )
});
     
   // For more information about handling dismissals please visit
   // https://sweetalert2.github.io/#handling-dismissals
   } else if (result.dismiss === Swal.DismissReason.cancel) {
     Swal.fire(
       'Cancelled',
       'Gateway is safe :)',
       'error'
     )
   }
 }) 

}





editrelay(g){
const dialogRef2 = this.dialog2.open(RelaychangeModalComponent, {
 width: '300px',
 height: '350px',
 data: {g: g}     
},
);

dialogRef2.afterClosed().subscribe(result => {
//  console.log('The dialog  two was closed');
});
}

singlegateway(x,y){

this.backend.getiotgateway(x,y)
.subscribe((data)=> {
 console.log("All gateway:",data["data"]);
       this.gateway = data["data"];

       for(var k = 0; k < this.gateway.length; k++){

         if(this.gateway[k].temp.length != 0){
           var val = this.gateway[k].temp[0].value.split("");
           this.temparray.push(
             {
               temp1:val[29]+""+val[30]+""+val[31]+""+val[32],
               temp2:val[33]+""+val[34]+""+val[35]+""+val[36],
               relay1:this.gateway[k].temp[0].relay1_satus,
               relay2:this.gateway[k].temp[0].relay2_satus
              })
         }else{
           this.temparray.push([])
         }
        
       } 
})
}



 
}




