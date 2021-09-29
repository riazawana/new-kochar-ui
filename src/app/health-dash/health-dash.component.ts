import { Component, OnInit, Inject } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { DetailsModalComponent } from './details-modal/details-modal.component';         
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatTableDataSource} from '@angular/material/table';

export interface healthData {
  location: string;
  router: string;
  wired:any;
  video:any;

}

@Component({
  selector: 'app-health-dash',
  templateUrl: './health-dash.component.html',
  styleUrls: ['./health-dash.component.scss']
})
export class HealthDashComponent implements OnInit {
  displayedColumns: string[] = ['location', 'router', 'wired','video'];
  dataSource: MatTableDataSource<healthData>;

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

    city:any;
    citys:any;
    state:any;
    states:any;
    zone:any;
    zones:any;

   
  ngOnInit(): void {

    
    this.ngxLoader.start();


        this.backend.healthDashboard()
        .subscribe((data)=> { 

    this.ngxLoader.stop();

           //console.log("All location:",data["data"]);
           this.healthdata = data["data"];
       this.dataSource = new MatTableDataSource(data["data"]);

        });


        

        this.backend.getallzones()
        .subscribe((data)=> { 


           //console.log("All zones:",data["data"]);
           this.zones = data["data"];
        });


        this.backend.getstate('101')
        .subscribe((data)=> { 


           //console.log("All states:",data["data"]);
           this.states = data["data"];
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
 




/////////////////////////filters  ////////////////////////

filter:any;

cityfind(x){
  this.backend.getcity(x)
  .subscribe((data)=> { 
     //console.log("All citys:",data["data"]);
     this.citys = data["data"];
  });
}

val:any = '';

totalfilter:any = '';

cityname :any;
statename :any;


onsubmit(){

  if(this.filter == "state"){
      var s = this.state.split(",");
      if(s.length == 2){
      this.statename = s[1]
      }
     this.val = "state_id="+s[0];
     this.cityfind(s[0]);
  }if(this.filter == "city"){
      var c = this.city.split(",");
      if(c.length == 2){
      this.cityname = c[1]
      }
      this.val = "city_id="+c[0];
  }if(this.filter == "zone"){
    this.val = "zoneName="+this.zone;
  }
  
  
  if(this.totalfilter != ""){
      this.totalfilter += "&"+this.val
  }else{
      this.totalfilter +=  "?"+this.val
  }

   this.filterfun(this.totalfilter);
   this.filter = undefined;

}

remove(x){
  this.totalfilter = "";


  if(x == 's'){

    this.state = undefined;
    this.statename = undefined;
    if(this.zone != undefined){
      this.totalfilter = "?zoneName="+this.zone;
    }if(this.city != undefined){

      var c = this.city.split(",");
      
      if(c.length == 2){
      this.cityname = c[1]
      }
      if(this.totalfilter != ""){
      this.totalfilter += "&city_id="+c[0];
      }else{
      this.totalfilter += "?city_id="+c[0];
      }
    }
   this.filterfun(this.totalfilter);
  } 
  
  if(x == 'z'){
    this.zone = undefined;

    if(this.state != undefined){
      var s = this.state.split(",");
      if(s.length == 2){
      this.statename = s[1]
      }
      this.totalfilter += "?state_id="+s[0];
    }if(this.city != undefined){
      var c = this.city.split(",");
      if(c.length == 2){
      this.cityname = c[1]
      }
      if(this.totalfilter != ""){
      this.totalfilter += "&city_id="+c[0];
      }else{
      this.totalfilter += "?city_id="+c[0];
      }
    }

   this.filterfun(this.totalfilter);

    

 } if(x == 'c'){

  this.city = undefined;

  this.cityname = undefined;

  if(this.zone != undefined){
    this.totalfilter = "?zoneName="+this.zone;
  }
  if(this.state != undefined){
    var s = this.state.split(",");
    if(s.length == 2){
    this.statename = s[1]
    }
    if(this.totalfilter != ""){
  this.totalfilter += "?state_id="+s[0];
}else{
  if(this.totalfilter != ""){
  this.totalfilter += "$state_id="+s[0];
  
}
}
  }

 this.filterfun(this.totalfilter);
  

}

alert(this.totalfilter)
}

reset(){
  this.totalfilter = '';

  this.backend.healthDashboard()
  .subscribe((data)=> { 


     //console.log("All location:",data["data"]);
     this.healthdata = data["data"];
     this.dataSource = new MatTableDataSource(data["data"]);

  });
}



 filterfun(x){

  this.backend.healthDashboardfilter(x)
    .subscribe((data)=> { 
      //console.log("All healthDashboardfilter:",data); 
      this.healthdata = data["data"];
      this.dataSource = new MatTableDataSource(data["data"]);

    
    })

}





}




















