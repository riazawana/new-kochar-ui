

import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import {Location} from '@angular/common';

@Component({
  selector: 'app-editenergy-meter',
  templateUrl: './editenergy-meter.component.html',
  styleUrls: ['./editenergy-meter.component.scss']
})
export class EditenergyMeterComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private _location:Location,
    private route: ActivatedRoute,
    private router:Router) { }

 

    selectedIndex: number = 0;
 
 
  location_id:string = "0";

  tempno1:any = 1;
  tempno2:any = 2;
  tempname1:any = "Temp 1";
  tempname2:any = "Temp 2";
  ncnodefault1:any = 0;
  ncnodefault2:any = 0;

  ncnono1:any = 1;
  ncnono2:any = 2;
  ncnoname1:any;
  ncnoname2:any;
  tempdefault1:any = "RR.R";
  tempdefault2:any = "RR.R";

  relayno:any = 1;
  relayname:any;
  name:any;
  mac:any;
  location_name:any;
  zone_name:any;

  client:any;
  zone_id:string;
  id:any;

  keycloak_user_id:any;
  ports:any;
  relays:any;

  formatMAC(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.mac= str.slice(0, 17);
  };

  
  ngOnInit(): void {
    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.client = params.get("client");

      })

      this.backend.getmodbus(this.id,this.client)
      .subscribe((data)=> { 
         console.log(data["data"][0]);
        this.ngxLoader.stop();

        this.name = data["data"][0].name;
        this.keycloak_user_id = data["data"][0].keycloak_user_id;
        this.location_id = data["data"][0].location_id;
        this.zone_name = data["data"][0].zone_name;
        this.location_name = data["data"][0].location_name;
        this.mac = data["data"][0].mac_id;
        this.ports = data["data"][0].ports;
        this.relays = data["data"][0].relays;
           this.ncnoname1 = this.ports[0].port_name;
           this.ncnoname2 = this.ports[1].port_name;
           this.tempname1 = this.ports[2].port_name;
           this.tempname2 = this.ports[3].port_name;
            this.relayname = this.relays[0].relay_name;

      })
    
  }




  

 
   
 
  submit(){

           this.ports[0].port_name = this.ncnoname1
           this.ports[1].port_name = this.ncnoname2
           this.ports[2].port_name =  this.tempname1
           this.ports[3].port_name =  this.tempname2
           this.relays[0].relay_name = this.relayname;
    
 var da = 
    {
      name: this.name,
      user_id: this.keycloak_user_id,
      location_id: this.location_id,
      relays: this.relays,
      ports: this.ports,
      zone_name: this.zone_name,
      location_name: this.location_name,
      mac_id: this.mac
  }


 
     console.log(da);

    this.backend.updatemodbus(da)
    .subscribe((data)=> { 
        console.log("Data:",data);
    
        if(data["success"] == true){
          Swal.fire("Secondary controller Updated Successfully!");
          this._location.back();
         }else{
          Swal.fire(data["msg"]);
         }
    });
  }









}
