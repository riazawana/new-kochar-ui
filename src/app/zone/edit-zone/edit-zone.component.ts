import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router 
  ) { }

  

  id:string;
  zone:any;
  name:string;
  user_id:string;
  _id:string;

  business_user = [];

  ngOnInit(): void {
    this.ngxLoader.start();
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getallusers()
      .subscribe((data)=> { 
  
        //  console.log("All Users:",data['data']);
  
         
         
         for(var k = 0; k<data['data'].length; k++){
           
          if(data['data'][k].roles[0].name == "business"){
            this.business_user.push(data['data'][k])
          }
          
         }
      })

      this.backend.getZone(this.id)
      .subscribe((data)=> { 
    this.ngxLoader.stop();

        //  console.log("Zone data Rj Data",data["data"][0]);
         //this.zone = data[0].data[0];
         this.zone = data["data"][0];     
         this.name = this.zone.name;
         this.user_id = this.zone.user_id+","+this.zone.keycloak_user_id;
         this.client = this.zone.client;
         this._id = this.zone._id;
        //  console.log(this.user_id);
        });
  }


  client:any;
  putclient(x){
    this.client = x
  }
  
  onsubmit(){
   

    const data = {
      name:this.name,
      _id:this._id
    }

    // console.log(data);

    this.backend.updatezone(data)
    .subscribe((result)=> { 
       console.log(result);

      if(result["success"] == true){
        Swal.fire("Zone updated Successfully!");
        this.router.navigate(["/kochar/Zones"]);
       }

     });

  }

  cancel(){
    this.router.navigate(["/kochar/Zones"]);
  }

}
