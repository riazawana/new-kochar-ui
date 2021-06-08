import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import {Location} from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-editrouter',
  templateUrl: './editrouter.component.html',
  styleUrls: ['./editrouter.component.scss']
})
export class EditrouterComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private _location:Location,
    private router: Router) { }

  
  id:any;
  data:any;
  _id:any;
  gateway_id:string = "0";
  location_id:string = "0";
  // router

  r_name:any;
  m_a:any;
  mob:any;
  imsi:any;
  sim:any;



  zone_id:string;
  location_name:any;
  zone_name:any;
  client:any;
  user_id:any;
  selectedIndex:any;

  formatMAC(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.m_a= str.slice(0, 17);
  };

  ngOnInit(): void {

    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");

      this.backend.getrouter(this.id)
      .subscribe((data)=> { 

    this.ngxLoader.stop();

           console.log("Data:",data["data"]);

          this.data = data["data"].result[0];


          this.r_name = this.data.name;
          this.imsi = this.data.imsi_number; 
          this.m_a = this.data.mac_id; 
          this.sim = this.data.sim_operator; 
          this.mob = this.data.sim_number; 
          this._id = this.data._id; 
          this.location_id = this.data.location_id;
          this.zone_name = this.data.location[0].zone_name;
          this.location_name = this.data.location[0].name ;
          this.client = this.data.location[0].client;
          this.user_id = this.data.location[0].user_id;
       });

      })

     

  }

 submit(){
  var da = JSON.parse(sessionStorage.getItem('userdata'));

   var data = {
    name: this.r_name,
    mac_id: this.m_a,
    location_id: this.location_id,
    sim_number: this.mob,
    imsi_number: this.imsi,
    sim_operator: this.sim,
    zone_name: this.zone_name,
    location_name: this.location_name,
    client: this.client,
    modified_by: da.name

   }


   
   
   console.log(data);

   this.backend.updaterouter(data)
   .subscribe((data)=>{
           console.log(data);

       if(data["success"] == true){
        // this.router.navigate(["/kochar/Devices"]);
      this._location.back();
       }
   })

 }


}


