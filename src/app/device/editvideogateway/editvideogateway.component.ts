import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Location} from '@angular/common';
@Component({
  selector: 'app-editvideogateway',
  templateUrl: './editvideogateway.component.html',
  styleUrls: ['./editvideogateway.component.scss']
})
export class EditvideogatewayComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private _location:Location,
    private router:Router) { }


  location_id:any;
  zone_id:string;
  zone_name:string;
  location_name:string;
  user_id:any;
  client:any;
  host_add:any;
  username:any;
  password:any;
  name:any;
  brand:any;
  mac_id:any;
  rtsp_port:any;
  analog_ports_count:any;
  cat:any;
  video_id:any;
  cameradetails:any;

  ngOnInit(): void {
    this.ngxLoader.start();

    this.user_id =  sessionStorage.getItem('userid');
    this.route.paramMap.subscribe(params => {
      this.video_id = params.get("id");
      // alert(this.video_id);
      })

      this.backend.getvideogateways(this.video_id)
    .subscribe((data)=> { 

    this.ngxLoader.stop();

       //console.log("Video Data",data);
       this.cameradetails = data["data"][0];
       this.mac_id = data['data'][0].mac_id;

       this.host_add = this.cameradetails.host;
       this.username  = this.cameradetails.username;
       this.password = this.cameradetails.password;
       this.brand = this.cameradetails.brand;
       this.name = this.cameradetails.name;
       this.location_id = this.cameradetails.location_id;
       this.user_id = this.cameradetails.user_id;
       this.mac_id = this.cameradetails.mac_id;
       this.cat = this.cameradetails.gateway_type;
       this.rtsp_port = this.cameradetails.rtsp_port;
      //  da["name"] = this.cameradetails.created_by;
       this.zone_name = this.cameradetails.zone_name;
       this.location_name = this.cameradetails.location_name;
       this.client = this.cameradetails.client;
       this.analog_ports_count = this.cameradetails.analog_ports_count;


    });

  
    
  }

  formatMAC(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.mac_id= str.slice(0, 17);
};


  selectedIndex: number = 0;

 nextStep(x) {
    this.selectedIndex = x;
  }

  previousStep(x) {
    this.selectedIndex = x;
  }




  submit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));


    var data = {
      host: this.host_add,
      username: this.username,
      password: this.password,
      brand: this.brand,
      name: this.name,
      location_id: this.location_id,
      user_id: this.user_id,
      mac_id: this.mac_id,
      gateway_type: this.cat,
      rtsp_port: this.rtsp_port,
      modified_by: da["name"],
      zone_name: this.zone_name,
      location_name: this.location_name,
      client:this.client,
      analog_ports_count:this.analog_ports_count,

    }

   //console.log(data);
    
    this.backend.updatevideogateways(data)
    .subscribe((data)=> { 
      //console.log("Data:",data);

      if(data["success"] == true){
        Swal.fire("Video gateway updated Successfully!");
        // this.router.navigate(["/kochar/Devices"]);
      this._location.back();

       }else{
        Swal.fire(data["msg"]);
       }
    });

  }



}
