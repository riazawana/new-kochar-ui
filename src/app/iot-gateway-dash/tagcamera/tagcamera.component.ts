import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-tagcamera',
  templateUrl: './tagcamera.component.html',
  styleUrls: ['./tagcamera.component.scss']
})
export class TagcameraComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router) { }

  
    gateways:any;
    gateway:any;
    sensor_name:any;
  ngOnInit(): void {
  
    this.ngxLoader.start();
 
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

camera_list:any;
portlist:any = [];
camera:any;
camarray:any = [];

filter:any = '';

config =  [
      {
          "nvr_mac": "",
          "camera_id": "",
          "sensor_name": "",
          "port_number": 1,
          "client": "",
          "mac_id": ""
      },{
        "nvr_mac": "",
        "camera_id": "",
        "sensor_name": "",
        "port_number": 2,
        "client": "",
        "mac_id": ""
    },{
      "nvr_mac": "",
      "camera_id": "",
      "sensor_name": "",
      "port_number": 3,
      "client": "",
      "mac_id": ""
  },{
    "nvr_mac": "",
    "camera_id": "",
    "sensor_name": "",
    "port_number": 4,
    "client": "",
    "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 5,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 6,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 7,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 8,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 9,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 10,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 11,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 12,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 13,
  "client": "",
  "mac_id": ""
},{
  "nvr_mac": "",
  "camera_id": "",
  "sensor_name": "",
  "port_number": 14,
  "client": "",
  "mac_id": ""
},
  ];

selgateway(gateway){

   this.camera_list = [];
   this.portlist = [];

    // alert(gateway);
     var val = gateway.split(",")
     var loc = val[0];
     var cli = val[2] ;
     var mac = val[1];
    this.backend.getdevicecameramapping(mac)
  .subscribe((data)=> { 
    console.log(data)
    this.portlist = data["data"];
  })

  this.backend.getCameraInfoLocationWise(loc,cli)
  .subscribe((data)=> { 
    console.log(data)
    this.camera_list = data["data"][0].cameras;

    // multiple camera list append

  });


  


}
nocamera:any;

nocamerafun(x){
  //alert(x);
  if(x == true){
    this.selgateway_nocam(this.gateway);
  }else{
       this.selgateway(this.gateway);
  }
}

selgateway_nocam(gateway){
  this.camera_list = [];
  this.portlist = [];

   // alert(gateway);
    var val = gateway.split(",")
    var loc = val[0];
    var cli = val[2] ;
    var mac = val[1];
   this.backend.getdevicecameramapping(mac)
 .subscribe((data)=> { 
   console.log(data)
  //  this.portlist = data["data"];
  for(var k = 0; k < data["data"].length; k++){
    if(data["data"][k].camera_id == undefined){
    this.portlist.push(data["data"][k]);
    }
  }
 })

 this.backend.getCameraInfoLocationWise(loc,cli)
 .subscribe((data)=> { 
   console.log(data)
   this.camera_list = data["data"][0].cameras;

   // multiple camera list append

 });

}

submit(){
  // console.log(this.portlist);
    var da = {
      data : this.portlist
    }
  this.backend.updatedevicecameramapping(da).subscribe((data)=>{
                console.log(data);
                if(data["success"] == true){
                  Swal.fire("Camera updated successfully");        
               }
  })
}

}