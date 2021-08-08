import { Component, OnInit,Inject } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {SocketioSendmsgService} from "../../socketio-sendmsg.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommandSettingMeterComponent } from '../../command-setting-meter/command-setting-meter.component';  

@Component({
  selector: 'app-viewenergy',
  templateUrl: './viewenergy.component.html',
  styleUrls: ['./viewenergy.component.scss']
})
export class ViewenergyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private soc:SocketioSendmsgService,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CommandSettingMeterComponent>,
    private router:Router,
    private backend: BackendconnectionService,
    @Inject(MAT_DIALOG_DATA) public datan: any
  ) { }


  openDialog(id): void {
    //  alert(id)
     this.dialogRef = this.dialog.open(CommandSettingMeterComponent, {
       width: '600px',
       height:'600px',
       data: {id: id}    
     },
     );

     this.dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog  two was closed');
     });
   }

  id:string;
  client:any;
  data:any;
  status:any;
  ngOnInit(): void {
    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.client = params.get("client");
     // alert(this.id)
      })
     
    this.backend.getmodbus(this.id,this.client)
    .subscribe((data)=> { 

    this.ngxLoader.stop();

       
   
    console.log("User Data",data["data"][0]);
       this.data = data["data"][0];
       console.log(this.data.modbus_info)

        if(this.data.modbus_info.length != 0){
          this.status = this.data.modbus_info[0].status.split("|");
          // alert(this.data.modbus_info)

        }else{
          this.status = [];
          // alert(this.data.modbus_info)
        }

    });
    

  }

  
  avg(x,y,z){
    return (parseInt(x,10)+parseInt(y,10)+parseInt(z,10))/3
  }

  

}


