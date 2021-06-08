import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-relaychange-modal',
  templateUrl: './relaychange-modal.component.html',
  styleUrls: ['./relaychange-modal.component.scss']
})
export class RelaychangeModalComponent implements OnInit {

  constructor( 
    private ngxLoader: NgxUiLoaderService,
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<RelaychangeModalComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    newdata:any;
    relay1_name:any;
    relay2_name:any;

    ngOnInit(): void {

    this.ngxLoader.start();

      console.log("data:",this.data)
      this.relay1_name = this.data.g.relay1_name;
      this.relay2_name = this.data.g.relay2_name;

    this.ngxLoader.stop();

    }

     submit(){
       var data = {
        "configuration": this.data.g.configuration,
        "location_id": this.data.g.location_id,
        "location_name": this.data.g.location_name,
        "mac_id": this.data.g.mac_id,
        "name": this.data.g.name,
        "relay1_name": this.relay1_name,
        "relay2_name": this.relay2_name,
        "router_mac_id": this.data.g.router_mac_id,
        "router_number": this.data.g.router_number,
        "client": this.data.g.client,
        "zone_name": this.data.g.zone_name,
        "modified_by": this.data.g.modified_by
        }

        this.backend.updateiotgateway(data)
        .subscribe((data)=> { 
           console.log(data);
           if(data["success"] == true){
            Swal.fire("Relays Updated Successfully!");
            // this.router.navigate(["/kochar/Devices"]);
            this.onNoClick();
           }
        })
     }
   
    

    onNoClick(): void {
      this.dialogRef.close();
    }

   
      }
