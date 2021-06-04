import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GetallrecordModalComponent } from '../getallrecord-modal/getallrecord-modal.component';  
import { CameraModalComponent } from '../camera-modal/camera-modal.component';         
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface CameraData {
  camera_status: string;
  name: string;
  type: string;
  footage: string;
  get: string;
  live:any;
}
declare const Hls: any;
@Component({
  selector: 'app-viewvideogateway',
  templateUrl: './viewvideogateway.component.html',
  styleUrls: ['./viewvideogateway.component.scss']
})



export class ViewvideogatewayComponent implements OnInit {

  constructor(
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,

    public dialogRef: MatDialogRef<ViewvideogatewayComponent>,
    public dialogRef2: MatDialogRef<ViewvideogatewayComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  displayedColumns: string[] = ['camera_status', 'name', 'type','footage', 'live', 'get'];
  dataSource: MatTableDataSource<CameraData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  

  cameras:any;
  id:any;
  zero:any;
  mac_id:any;
  start:any=[];
  starttime:any=[];

  end:any=[];
  endtime:any=[];

  ft:any = [];

  openDialog(x,y,z,e,st,et): void {

     var sy = y.getFullYear();
     var sm = y.getMonth();
     var sd = y.getDate();
     var stt = [];
     var ett = [];

     if(st == undefined){
       stt[0] = '00';
       stt[1] = '00';
     }else{
     stt = st.split(':');
     }

     if(et == undefined){
      ett[0] = '00';
      ett[1] = '00';
    }else{
     ett = et.split(':');
    }


    //  alert(sy);
    // alert(sm);
    // alert(sd);
    // alert(stt);


     var ey = z.getFullYear();
     var em = z.getMonth();
     var ed = z.getDate();



    var ds = new Date(sy, sm, sd, stt[0], stt[1], 0, 0);
    var de = new Date(ey, em, ed, ett[0], ett[1], 0, 0);
 
    // alert(ds);
    // alert(de);


     const dialogRef = this.dialog.open(GetallrecordModalComponent, {
       data: {mac: x,start:ds,end:de,id:e}    
     },
     );

     dialogRef.afterClosed().subscribe(result => {
     });
   }

   getlivefeed(x){

    const dialogRef2 = this.dialog2.open(CameraModalComponent, {
      data: {url: x,isRecording:false}    
    },
    );

    dialogRef2.afterClosed().subscribe(result => {
    });
  }
  
onNoClick2(): void {
    this.dialogRef2.close();
  }
   onNoClick(): void {
    this.dialogRef.close();
  }
  
  getallRtspinterval:any;
  cameralistinterval:any;
  cameradetails :any = {
    location_name:'',
    zone_name:'',
    name:'',
    host:''
  };
  ngOnInit(): void {

    this.ngxLoader.start();

    alert("Please install Desktop App and start it to watch rtsp footage!");

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })
     
      
    this.backend.getvideogateways(this.id)
    .subscribe((data)=> { 
    this.ngxLoader.stop();

       console.log("User Data",data);
       this.cameradetails = data["data"][0];
       this.mac_id = data['data'][0].mac_id;


    });

    this.backend.getchannelinfo(this.id)
    .subscribe((data)=> { 
       console.log("User Data",data);
       this.cameras = data["data"].channel_info;

       this.zero = data['data'].channel_zero_resp;

       
       for(var i = 0; i<this.cameras.length; i++){
          this.ft.push('');
       }

      this.dataSource = new MatTableDataSource(this.cameras);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });

    // this.backend.getChannelZero(this.id)
    // .subscribe((data)=> { 
    //    console.log("User Data",data);
    //    //this.user = data['data'];
    //    this.zero = data['data'].data;


    // });

 this.cameralistinterval =  setInterval(()=>{
    this.allcamera = this.backend.cam_list ;
    // console.log(this.allcamera);
  },1000)


   //////////////////////////
   this.getAllRtspProcesses();
   this.getallRtspinterval = setInterval(() => {
       this.fetchAndPopulateResourcesUsage();
       this.getAllRtspProcesses();
   }, 5000);
  
   ////////////////////////////
  
  }

  getAllRtspProcesses() {
    this.backend.camera_list().subscribe((rs)=> { 
    // console.log("camera-list:",rs);
    this.backend.cam_list = rs["data"];

    })	
    }


    fetchAndPopulateResourcesUsage() {
      this.backend.resources_usage().subscribe((rs)=> { 
        if(rs["success"]) {
          // console.log(rs);
          //creat small table
          // console.log(rs["data"].cpuUsage);
          (<HTMLInputElement>document.getElementById("acu")).innerHTML = rs["data"].cpuUsage;
          (<HTMLInputElement>document.getElementById("ru")).innerHTML = rs["data"].usedRamPercent;
          (<HTMLInputElement>document.getElementById("tcu")).innerHTML = rs["data"].totalCpuUsage;
          (<HTMLInputElement>document.getElementById("al")).innerHTML = rs["data"].loadAvg;
      } else {
          // console.log(rs["data"].cpuUsage);
          (<HTMLInputElement>document.getElementById("acu")).innerHTML = '0';
          (<HTMLInputElement>document.getElementById("ru")).innerHTML = '0';
          (<HTMLInputElement>document.getElementById("tcu")).innerHTML = '0';
          (<HTMLInputElement>document.getElementById("al")).innerHTML = '0';
      }
      });
    }

  allcamera:any;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  
  
  zerobtn(x){
    // alert(x);
  }

  footage_ret(x,y,z){
  
    this.backend.footageretention(x,y)
    .subscribe((data)=> { 
      // console.log("Data",data);
      this.ft[z] = data["data"];

    });
  }


  // delete(x){
  //    alert(x)
  // }
  

  ngOnDestroy(){
    clearInterval(this.getallRtspinterval);
    clearInterval(this.cameralistinterval);
  }

  delete(process_id) {

     //alert(process_id);
    this.backend.stop_camera(process_id).subscribe((rs)=> { 
      // console.log("asdsd",rs);

      if(rs["success"]) {
        this.getAllRtspProcesses();
    } else {
        console.log(rs);
    }
    })
    }


    // stopRtspProcess(process_id) {
    //   // alert("secons"+process_id);
    //   this.backend.stop_camera(process_id).subscribe((rs)=> { 
    //     // console.log("asdsd",rs);
  
    //     if(rs["success"]) {
    //       this.getAllRtspProcesses();
    //   } else {
    //       console.log(rs);
    //   }
    //   })
    //   }

  

    statushide:boolean = true;

    hide(){
      if(this.statushide == true){
        this.statushide = false;
      }else{
        this.statushide = true
      }
    }





   
}














