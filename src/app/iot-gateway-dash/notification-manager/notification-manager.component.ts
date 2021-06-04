import { Component, OnInit,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent implements OnInit {

  constructor(
              private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private backend: BackendconnectionService 
            ){ }

isvalid:boolean=false; 
add:boolean = false;
edit:boolean = false;
view:boolean = false;
delete:boolean = false;

gateways:any;

 data =  [ 
   {
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 1
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 2
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 3
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 4
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 5
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 6
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 7
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 8
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 9
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 10
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 11
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 12
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 13
},
{
  "client": "",
  "notif_arm": false,
  "notif_diarm": false,
  "mac_id": "",
  "port_number": 14
}
]

  ngOnInit(){
    this.ngxLoader.start();

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
          if(features[i].feature_name == 'Notification Manager'){
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

  
    this.gateways = [];
      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
    this.ngxLoader.stop();

        console.log("All gateways:",data["data"]);

        for(var i = 0; i < data["data"].length; i++)
        {
          this.gateways = this.gateways.concat(data["data"][i]);
        }
  
        console.log("All gateways:",this.gateways);

      });
    
  }
  ports:any = [];
gateway:any;

  getport(x){
    this.backend.getnotificationsettings(x)
    .subscribe((data)=> { 
      console.log("Data:",data);
        this.ports = data["data"];
        this.data = data["data"];

    });

  }

  onclick(type,value,port_number){
       
   for(var k = 0; k<this.data.length; k++){
        if(this.data[k].port_number == port_number){
          if(type == "notif_arm"){
            this.data[k].notif_arm = value;
          }else{
            this.data[k].notif_diarm = value;
          }
        }
   }


  }


  submit(){
     console.log(this.data);
     var da = {
       data:this.data
     }
    this.backend.updatenotificationsettings(da)
    .subscribe((data)=> { 
        console.log("Data:",data);

        if(data["success"]== true){
         Swal.fire("Notification Setting updated successfully!");
        }

    });

  }
  

}





 
 