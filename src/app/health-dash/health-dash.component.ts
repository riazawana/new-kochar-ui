import { Component, OnInit, Inject } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { DetailsModalComponent } from './details-modal/details-modal.component';         
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-health-dash',
  templateUrl: './health-dash.component.html',
  styleUrls: ['./health-dash.component.scss']
})
export class HealthDashComponent implements OnInit {

  constructor(
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HealthDashComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
    id:string;
    healthdata:any;
   faMapMarker = faMapMarkerAlt;

  
   
  ngOnInit(): void {

    
    this.ngxLoader.start();


        this.backend.healthDashboard()
        .subscribe((data)=> { 

    this.ngxLoader.stop();

           console.log("All location:",data["data"]);
           this.healthdata = data["data"];
        });

  }



  detailsVideo(x): void {
    var countonline = 0;
    var countoffline = 0;

    for(var a = 0; a < x.length; a++){
      if(x[a].camera_status == 'true'){
       countonline++;
      }else{
       countoffline++;
      }
    }


    const dialogRef = this.dialog.open(DetailsModalComponent, {
      data: {type: 'Video',online:countonline,offline:countoffline}    
    },
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  detailsIN(x,y,z): void {
    var rssi_val = x[0].split("|");
    var keypadValue = (rssi_val[rssi_val.length -1] == "R") || (rssi_val[rssi_val.length -1] == "T") ? "OK" : "Error"

    const dialogRef = this.dialog.open(DetailsModalComponent, { 
      data: {type: 'IN',rssi:rssi_val[0],mode:y,keypad:keypadValue}    
    },
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  

  

  detailsRouer(m,v,mi,u,l): void {



    const dialogRef = this.dialog.open(DetailsModalComponent, {
      data: {type: 'Router',mode:m,version:v,meminfo:mi,uptime:u,loadavg:l}    
    },
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
 

  onNoClick(): void {
   this.dialogRef.close();
 }


 router_route(x){
  
    window.open( 
  "http://ecc93904a372.ngrok.io/#/kochar/Devices/openrouter/"+x,"_blank");
}
 
 IN_route(x){
  // this.router.navigate(['/kochar/Devices/singlegateway',x]);
 }
}


























