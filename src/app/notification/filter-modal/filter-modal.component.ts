import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../../backendconnection.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<FilterModalComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  


    type:any;

    ngOnInit(): void {
      this.getlocation();
      this.getgateway();
      this.type = this.data.type;
      //  alert(this.type);
    }

    locations:any;
    gateways:any;
    gateway:any;
    location:any;
    tat:any;
    status:any;

    getlocation(){
      this.backend.getlocationuserwise()
      .subscribe((data)=> { 
        console.log("All location:",data["data"]);
         this.locations = data["data"][0].locations;
      });
    }
     
    getgateway(){
      this.gateways = [];
      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
        console.log("All gateways:",data["data"]);
        for(var i = 0; i < data["data"].length; i++)
        {
          this.gateways = this.gateways.concat(data["data"][i]);
        }
        console.log("All gateways:",this.gateways);
      });
    }

    

    onNoClick(): void {
      this.dialogRef.close();
    }
    val:any;

    onsubmit(){
      if(this.type == "gateway"){
         this.val = this.gateway;
      }if(this.type == "tat"){
        this.val = this.tat;
      }if(this.type == "location"){
        this.val = this.location;
      }if(this.type == "status"){
        this.val = this.status;
      }
    }

   
      }
