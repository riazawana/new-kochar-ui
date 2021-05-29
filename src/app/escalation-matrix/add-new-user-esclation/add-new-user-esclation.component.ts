import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-new-user-esclation',
  templateUrl: './add-new-user-esclation.component.html',
  styleUrls: ['./add-new-user-esclation.component.scss']
})
export class AddNewUserEsclationComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService,
    private route: ActivatedRoute,
    private router: Router,
    private _location:Location

  ) { }
  hub:string;
  email:string;
  phone:string;
  name:string;
  notification_category:any;
  location_id:string;
  gateway_id:string;
  level:string;
  designation:string;
  tat:string;
  created_by:string;
  locations:any;
  hub_list:any;
  level_list = [1,2,3,4,5,6,7,8,9,10];
  user_list:any;

   client : any; 
   id:any;
  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
        if(this.id != null){
            this.location_id = this.id+','+params.get("name")+','+params.get("cli");
            this.gethub(this.id,params.get("cli"));
        }
    })
    
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    this.backend.getlocationuserwise()
    .subscribe((data)=> { 
     console.log(data);
      this.locations = data["data"][0].locations;

    })

  }

  gethub(x,y){     
    this.backend.getgatewaylocationwise(x,y)
    .subscribe((data)=> { 
      //console.log(data);
      this.hub_list = data["data"];
    })

  }

  onsubmit(){  
    // alert("sub");
    console.log(this.array);
    if(this.array.data.length == 0){
      // alert("direct submit")

      var da = JSON.parse(sessionStorage.getItem('userdata'));
      var h = this.hub.split(",");
      var la = this.location_id.split(",");
      this.client =  la[2];

      var single =
        {
      email:this.email,
      phone:this.phone,
      name:this.name,
      notification_category:this.notification_category,
      location_id:la[0],
      location_name:la[1],
      gateway_id: h[2],
      level:this.level,
      designation:this.designation,
      tat:this.tat,
      created_by:da["name"],
      client:this.client,
      device_type:[
        {
          "type": "iot_gateway",
          "mac_id": h[1],
          "gateway_name": h[0]
        }
      ]
        }

        this.array.data.push(single);

      this.backend.addescalationmatrix(this.array)
      .subscribe((data)=> { 
        console.log(data);
        if(data["success"]==true){
          Swal.fire("Escalation matrix added successfully");
         this._location.back();
        }
        
      })  
    }else{
      this.backend.addescalationmatrix(this.array)
      .subscribe((data)=> { 
        console.log(data);
        if(data["success"]==true){
          Swal.fire("Escalation matrix added successfully");
         this._location.back();
        }
        
      })  
    }

    
    }

    array:any = {
      data:[]
    };
    del(x){
      this.array.data.splice(x, 1);
    }

    add(){
    

      var da = JSON.parse(sessionStorage.getItem('userdata'));
      var h = this.hub.split(",");
      var la = this.location_id.split(",");
      this.client =  la[2];

    var newadd =
        {
      email:this.email,
      phone:this.phone,
      name:this.name,
      notification_category:this.notification_category,
      location_id:la[0],
      location_name:la[1],
      gateway_id: h[2],
      level:this.level,
      designation:this.designation,
      tat:this.tat,
      created_by:da["name"],
      client:this.client,
      device_type:[
        {
          "type": "iot_gateway",
          "mac_id": h[1],
          "gateway_name": h[0]
        }
      ]
        }

        this.array.data.push(newadd);

        this.name = "";
        this.email = "";
        this.phone = "";
        this.designation = "";
        this.tat = ""

      //console.log("asd");

    }

    cancel(){
      this._location.back();
     }

  }




