import { AfterViewInit,OnInit,Component ,OnDestroy,ViewChild,ViewChildren,QueryList } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BackendconnectionService } from '../backendconnection.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import {SocketioService} from "../socketio.service";
import {SocketioSendmsgService} from "../socketio-sendmsg.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';


export interface health {
  sr_no:string;
  status:boolean;
  locationname:string; 
  notification:string;
  createdAt:number;
  updatedAt:number; 
  tat:number;
  remark:string;
  action:any;
}

export interface risk {
  sr_no: string;
  status: boolean;
  locationname: string; 
  notification:string;
  createdAt:number;
  updatedAt:number; 
  tat:number;
  remark:string;
  action:any;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = ['sr_no', 'status', 'locationname','notification','createdAt','updatedAt','tat','remark', 'action'];
  displayedColumns2: string[] = ['sr_no', 'status', 'locationname','notification','createdAt','updatedAt','tat','remark', 'action'];
  
  dataSource: MatTableDataSource<health>;
  dataSource2: MatTableDataSource<risk>;

  

  // @ViewChild('MatPaginator') paginator: MatPaginator;
  // @ViewChild('MatPaginator2') paginator2: MatPaginator;

 
  // @ViewChild('MatSort') t1Sort: MatSort;
  // @ViewChild('MatSort2') t2Sort: MatSort;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  add:any = false;
  delete:any = false;
  edit:any = false;
  view:any = false;

  
  constructor(
    private backend: BackendconnectionService,
    private router:Router,   
    private soc:SocketioSendmsgService,    
  ) {
    this.dataSource = new MatTableDataSource;
    this.dataSource2 = new MatTableDataSource;

    // this.dataSource1 = new MatTableDataSource<AssignmentElement>(ASSIGNMENT_ELEMENT_DATA);
    // this.dataSource2 = new MatTableDataSource<RoleElement>(ROLE_ELEMENT_DATA);
   }
   myVar:any;
   client:any;

  ngOnInit() {
     const that = this;
     that.fetchdata();
  //  this.myVar = setInterval(function(){ 
  //           that.fetchdata();
  //    }, 5000);


  this.soc.messages.subscribe(msg => {
    console.log(msg);
    that.fetchdata();
  })

     var role = sessionStorage.getItem('role');
     if(role == 'admin'){
       setTimeout(() => {
          this.add = true;
       this.edit = true;
       this.delete = true;
       this.view = true;
       });
     }else{
     
       setTimeout(() => {
         var features = JSON.parse(sessionStorage.getItem('features'));
         for(var i = 0; i < features.length; i++){
           if(features[i].feature_name == 'Notifications'){
              if(features[i].add == true){
             this.add = true;
              }
              if(features[i].view == true){
               this.view = true;
                }
                if(features[i].edit == true){
                 this.edit = true;
                  }if(features[i].delete == true){
                   this.delete = true;
                    }
     
           } 
         }
         
        }, 1);
     }
   
     this.getlocation();
     this.getgateway();

  }

  totalfilter:any =""; 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnDestroy(){
    clearInterval(this.myVar);
  }

  

  health:any;
  risk:any;
  filter:any = '';
  filterdate:any = '';

  

val:any;
status:any;
gateway:any;
tat:any;
location:any;

resetfilter(){
  this.totalfilter = "";
  this.filter = '';
  this.filterdate = '';
  this.fetchdata();
}

onsubmit(){

  if(this.filter == "gateway"){
     this.val = "macId="+this.gateway;
  }if(this.filter == "tat"){
    this.val = "tat="+this.tat;
  }if(this.filter == "tatStatus"){
    this.val = "locationName="+this.location;
  }if(this.filter == "status"){
    this.val = "status="+this.status;
  }

   if(this.totalfilter != ""){
  this.totalfilter += "&"+this.val
   }else{
  this.totalfilter +=  "?"+this.val
   }

  //  alert(this.totalfilter);
   this.filterfun(this.totalfilter);

}
locations:any;
gateways:any;

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

  
  
  dofilter(x){
    // this.health = [];
    // this.risk = [];

    var from = '';
    var to = '';

    var today = new Date();
    // var yes = new Date(today);
    // yes.setDate(yes.getDate() - 1);
    var yes = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    // alert(yes);

    var yesterday = yes.getFullYear()+'-'+(yes.getMonth() + 1).toString().padStart(2, "0")+'-'+yes.getDate();
    // alert(yesterday);
    var date = today.getFullYear()+'-'+(today.getMonth() + 1).toString().padStart(2, "0")+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var sev = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    var sevenday = sev.getFullYear()+'-'+(sev.getMonth() + 1).toString().padStart(2, "0")+'-'+sev.getDate();
    var twentyeight = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
    var twentyeightday = twentyeight.getFullYear()+'-'+(twentyeight.getMonth() + 1).toString().padStart(2, "0")+'-'+twentyeight.getDate();
    var ninty = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    var nintyday = ninty.getFullYear()+'-'+(ninty.getMonth() + 1).toString().padStart(2, "0")+'-'+ninty.getDate();
    var one = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    var oneyear = one.getFullYear()+'-'+(one.getMonth() + 1).toString().padStart(2, "0")+'-'+one.getDate();

    var fildata = "";

    if(x == 'today'){
        from = date+"T"+"00:00:00";
        to = date+"T"+time;
        // alert(from+"-"+to);
         fildata = "dateFrom="+from+"&dateTo="+to;
    }if(x == 'yes'){
      from = yesterday+"T"+"00:00:00";
      to = date+"T"+time;
      // alert(from+"-"+to);
       fildata = "dateFrom="+from+"&dateTo="+to;
    }if(x == '7'){
      from = sevenday+"T"+"00:00:00";
      to = date+"T"+time;
      // alert(from+"-"+to);
       fildata = "dateFrom="+from+"&dateTo="+to;
    }if(x == '28'){
      from = twentyeightday+"T"+"00:00:00";
      to = date+"T"+time;
      // alert(from+"-"+to);
       fildata = "dateFrom="+from+"&dateTo="+to;
    }if(x == '90'){
      from = nintyday+"T"+"00:00:00";
      to = date+"T"+time;
      // alert(from+"-"+to);
       fildata = "dateFrom="+from+"&dateTo="+to;
    }if(x == '365'){
      from = oneyear+"T"+"00:00:00";
      to = date+"T"+time;
      // alert(from+"-"+to);
       fildata = "dateFrom="+from+"&dateTo="+to;
    }

  // alert(fildata);
  
  if(this.totalfilter != ""){
    this.totalfilter += "&"+fildata
     }else{
    this.totalfilter +=  "?"+fildata
     }
  
    // alert(this.totalfilter);
     this.filterfun(this.totalfilter);
   
  }

  filterfun(x){

    // this.notdata = [];
    // this.risk = [];
    // this.health = [];

    this.backend.getallnotificationsbyfilter(x)
      .subscribe((data)=> { 
        console.log("All Notifications:",data); 
  
        var sorthealth = data["data"].heatlthCheck; 
        var sortrisk =  data["data"].riskAssesment;


   
       this.dataSource2 = new MatTableDataSource( sortrisk );
       this.dataSource = new MatTableDataSource( sorthealth );

         this.dataSource.paginator = this.paginator.toArray()[1];
         this.dataSource.sort = this.sort.toArray()[1];
         this.dataSource2.paginator = this.paginator.toArray()[0];
         this.dataSource2.sort = this.sort.toArray()[0];
  
  
      });
  }


  notdata:any;
  fetchdata(){
    // this.notdata = [];
    // this.risk = [];
    // this.health = [];


    this.backend.getallnotifications()
    .subscribe((data)=> { 
      console.log("All Notifications:",data); 

    
         
      
        var sorthealth = data["data"].heatlthCheck; 
        var sortrisk =  data["data"].riskAssesment;


          console.log("Risk:",sortrisk);

           console.log("Health:",sorthealth);
       
       this.dataSource2 = new MatTableDataSource( sortrisk );
       this.dataSource = new MatTableDataSource( sorthealth );

       this.dataSource.paginator = this.paginator.toArray()[1];
       this.dataSource.sort = this.sort.toArray()[1];
       this.dataSource2.paginator = this.paginator.toArray()[0];
       this.dataSource2.sort = this.sort.toArray()[0];


    });
  }

  getnotificationdetails(x,y){
  
    this.router.navigate(['/kochar/Notifications/notification-details',x,y]);
  }

  reload(){
    window.location.reload()
  }

}
