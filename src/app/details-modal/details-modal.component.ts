import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../backendconnection.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<DetailsModalComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    rssi:any = '';
    mode:any = '';
    keypad:any = '';

    online:any = '';
    offline:any = '';


    type:any;

    ngOnInit(): void {
    
      this.type = this.data.type;
     
      if(this.data.type == "IN"){
        this.rssi = this.data.rssi;
       // this.mode = this.data.mode;
        this.keypad = this.data.keypad;

        if(this.data.mode == 0){
          this.mode = "Disarm";
        }else{
          this.mode = "Arm"
        }
      }if(this.data.type == "Video"){
        this.online = this.data.online;
        this.offline = this.data.offline;
      }else{
          //  this.backend.getroutermac(this.data.mac_id).subscribe((data)=> { 
          //       //   console.log(data)

                   this.rmode = this.data.mode;
                   this.version =  this.data.version;
                   this.uptime =  this.data.uptime;
                   this.meminfo =  this.data.meminfo;
                    this.cpu = this.data.loadavg;


          //  })
      }

    
    }

    rmode:any = '';
    version:any= '';
    uptime:any= '';
    meminfo:any= '';
    cpu:any= '';


    onNoClick(): void {
      this.dialogRef.close();
    }

   
      }
