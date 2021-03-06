


import { Component, OnInit,Inject } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import {SocketioSendmsgService} from "../../socketio-sendmsg.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommandSettingMeterComponent } from '../../command-setting-meter/command-setting-meter.component';  

@Component({
  selector: 'app-secondry-gateway',
  templateUrl: './secondry-gateway.component.html',
  styleUrls: ['./secondry-gateway.component.scss']
})
export class SecondryGatewayComponent implements OnInit {

 

   
   
 
   constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private soc:SocketioSendmsgService,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CommandSettingMeterComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    id:string;
   modbus:any;
   faMapMarker = faMapMarkerAlt;

   panelOpenState = false;

   temp1 = 'NA';
   temp2 = 'NA';

    isChecked = 0;


  

    sendMessage(t,x,y,v) {
      var data = {
        cmdtype:"modbus_commands",
        mac_id:x,
        version:y,
        type:t,
        value:v
      }
       
     this.soc.sendMsg(data);
  
     
   }

  /////////////////////////modal 2/////////////////////////////////////
     openDialog(id,v): void {
      //  alert(id)
       this.dialogRef = this.dialog.open(CommandSettingMeterComponent, {
         width: '600px',
         height:'600px',
         data: {id: id,v:v}    
       },
       );

       this.dialogRef.afterClosed().subscribe(result => {
        //  console.log('The dialog  two was closed');
       });
     }

    

     relayonclick(x,y){
      //  alert(x+","+y);
     }
   
  ngOnInit(): void {
    this.ngxLoader.start();

  

    this.backend.getmodbususerwise()
    .subscribe((data)=> { 

    this.ngxLoader.stop();

        //console.log("Modbus",data["data"]);
       this.modbus = data["data"];

    });



  }

  delete(x,y){

    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
      
  
   
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Energymeter!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
  
           this.backend.deletemodbus(x,y)
    .subscribe((data)=> { 
  
      //  console.log(data);
      this.refreshtemp();
      Swal.fire(
        'Deleted!',
        'Energymeter has been deleted.',
        'success'
      )
    });
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Gateway is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }

  refreshtemp(){
    this.backend.getmodbususerwise()
    .subscribe((data)=> { 
       this.modbus = data["data"];

    });
  }

  clearqueue(x){
    this.backend.clearqueue(x)
    .subscribe((data)=> { 
      console.log(data["data"])
    });
  }





  

}
