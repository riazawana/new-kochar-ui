import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-smart-meter',
  templateUrl: './add-smart-meter.component.html',
  styleUrls: ['./add-smart-meter.component.scss']
})
export class AddSmartMeterComponent implements OnInit {


  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router,
    private _location:Location
  ) { }

  id:any;
  name:any;
  address:any;
  config:any;
  location:any;
  client:any;

  ngOnInit(): void {
    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getlocation(this.id)
     .subscribe((data)=> {
    this.ngxLoader.stop();

      // console.log(data);
       this.location = data["data"][0].name;
       this.client = data["data"][0].client;

      })
  }

 
 


  onsubmit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    var data = {
      "modbus_id": this.id,
      "smartmeter":[{
        "smartmeter_name": this.name,
        "address_no": this.address,
        "configuration": this.config,
        "client":this.client
      }]
    }

    //console.log(data);

    

    this.backend.addsmartmeter(data)
    .subscribe((data)=> { 
      console.log(data);
      if(data["success"] == true){
        Swal.fire("Smart Meter Added Successfully!");
        // this.router.navigate(["/kochar/Devices"]);
      this._location.back();
       }
    })

    }

    cancel(){
      this._location.back();
     }

  }




