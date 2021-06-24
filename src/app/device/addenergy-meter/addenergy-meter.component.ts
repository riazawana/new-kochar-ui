import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-addenergy-meter',
  templateUrl: './addenergy-meter.component.html',
  styleUrls: ['./addenergy-meter.component.scss']
})
export class AddenergyMeterComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router) { }

 

 
 
  location_id:string = "0";

  tempno1:any = 1;
  tempno2:any = 2;
  tempname1:any = "Temp 1";
  tempname2:any = "Temp 2";
  ncnodefault1:any = 0;
  ncnodefault2:any = 0;
  version:any;
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
      this.location_id = params.get("id");
      })

      this.backend.getlocation(this.location_id)
      .subscribe((data)=> { 
    this.ngxLoader.stop();

//        console.log(data);
        this.location_name = data["data"][0].name;
        this.zone_name = data["data"][0].zone_name; 
        this.client = data["data"][0].client;
      })
    
  }


  selectedIndex: number = 0;

 nextStep(x) {
   
    this.selectedIndex = x;
  }

  previousStep(x) {
  
    this.selectedIndex = x;

  }

  location_list:any;





  

 
   
 
  submit_meter(){
    
 var da = 
    {
    "name": this.name,
    "mac_id": this.mac,
    "location_id":this.location_id,
    "location_name":this.location_name,
    "zone_name":this.zone_name,
    "client":this.client,
    "version":this.version,
    "relays":[{
      "relay_name": this.relayname,
      "relay_number": this.relayno
    }],
    "ports":[
      {
        "port_name": this.ncnoname1,
        "port_number": this.ncnono1,
        "default_state": this.ncnodefault1,
        "for_temperature": false
      },
      {
        "port_name": this.ncnoname2,
        "port_number": this.ncnono2,
        "default_state": this.ncnodefault2,
        "for_temperature": false
      },
      {
        "port_name": "Temp 1",
        "port_number": 3,
        "default_state": "RR.R",
        "for_temperature": true
      },
      {
        "port_name": "Temp 2",
        "port_number": 4,
        "default_state": "RR.R",
        "for_temperature": true
      }
    ]
  }


 
  //  console.log(da);

    this.backend.addmodbus(da)
    .subscribe((data)=> { 
       console.log("Data:",data);
       //this.location_id = data["location_id"];
       //this.nextStep(1);

       if(data["success"] == true){
        Swal.fire("Energy Meter Added Successfully!");
        this.router.navigate(["/kochar/Devices"]);
       }
    });
  }









}
