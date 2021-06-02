import { Component, OnInit,Inject } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
declare const Hls: any;
import { DetailModalComponent } from '../detail-modal/detail-modal.component';         
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data2: any,
    private router:Router) { }

  id:any;
  data:any;
  date:any = "";
  cli:any;


  initial_cam_id:any = '';
  ngOnInit(): void {
    

     this.route.paramMap.subscribe(params => {

      // console.log(params.get("id"))
      this.id = params.get("id");
      this.cli = params.get("cli");
               
            this.backend.getnotification(this.id,this.cli)
          .subscribe((data)=> { 
             console.log("Data:",data);
             this.wholedata = data["data"];
             this.data = data["data"].notification[0];
              this.date = this.data.send_time;
            // console.log("Data:",this.data);
            this._id = this.data._id;
            this.send_time = this.data.send_time;
            
            if(this.data.notification_category_name == "Risk Assessment") {
              // this.initial_cam_id = this.data.camera_id;
              this.initial_cam_id = this.data.data.camera_id;
              this.getcam(this.data.data.nvr_mac);
            }else{
              console.log("health");
            }

          });

      })

    

  }

// risk
channel_zero_resp:any = [];
nvrname:any;
wholedata:any;
  getcam(mac_id){
    this.backend.getchannelinfo(mac_id)
    .subscribe((data)=> {  
           console.log("cam data:",data);
           this.camdata = data["data"].channel_info;
           this.channel_zero_resp = data["data"].channel_zero_resp;
           this.nvrname = data["data"].info[0].name;
          // alert(this.initial_cam_id);
           for(var k = 0; k < this.camdata.length; k++){
              if( this.initial_cam_id == this.camdata[k].camera_id){
                this.cuncamera = this.camdata[k].rtsp_url;
                this.runcamera(this.camdata[k].rtsp_url);
              }
           }
    })
  }
  cuncamera:any;
  camdata:any = [];
  valid:Boolean = false;
  voicelog:String = "";
  remarks:String = "";
  _id:String="";
  send_time: string = "";


  update(){
    var data = {
      _id:this._id,
      valid:this.valid,
      voicelog:this.voicelog,
      remarks:this.remarks,
      client:this.cli,
      send_time:this.send_time
    }
      //  console.log(data);

       this.backend.updatenotification(data)
          .subscribe((data)=> { 
            // console.log("Mess:",data);
             if(data["success"] == true){
              this.router.navigate(['/kochar/Notifications']);

             }

          });
  }


  runcamera(rtspurl){

 
    var senddata = {
      rtspUrl: rtspurl, 
      isRecording: false
    }
    this.backend.sendCommandToStartRtspProcessing(senddata).subscribe((rs)=> { 
      //  console.log("Data",rs);
  
     this.process_id = rs["camProcessId"];

      setTimeout(() => {
      var  video_file_checker =  setInterval(function(){ 
        fetch('https://localhost:9999'+rs['liveUrl']).then(res=>{
        if (res.status == 200) {
          var video = (<HTMLMediaElement>document.getElementById("video"));
          var videoSrc = 'https://localhost:9999'+rs['liveUrl'];
          // console.log(videoSrc)
          if (Hls.isSupported()) {

            // alert(1);
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
              video.play();
            });
          }
          else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'https://localhost:9999'+rs['liveUrl'];
            video.addEventListener('loadedmetadata',function() {
              video.play();
            });
          }
          clearInterval(video_file_checker);
        }
      })
       }, 500);
      },1000)

    });

  }



 

  process_id:any;

  onclose(): void {
    this.stopRtspProcess(this.process_id);
  }

  changecam(x){
    alert(x);
    this.onclose();
    this.runcamera(x);
  }

  stopRtspProcess(process_id) {
    // alert("secons"+process_id);
    this.backend.stop_camera(process_id).subscribe((rs)=> { 
      // console.log("asdsd",rs);

      if(rs["success"]) {
        this.getAllRtspProcesses();
    } else {
        console.log(rs);
    }
    })
    }

    getAllRtspProcesses() {
      this.backend.camera_list().subscribe((rs)=> { 
      // console.log("camera-list:",rs);
      this.backend.cam_list = rs["data"];
  
      })	
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      openDialog(type): void {
        const dialogRef = this.dialog.open(DetailModalComponent, {
          width: '650px',
          height: '200px',
          data: {da: this.wholedata,type}     
        },
        );
 
        dialogRef.afterClosed().subscribe(result => {
         //  console.log('The dialog  two was closed');
        });
      }

}
