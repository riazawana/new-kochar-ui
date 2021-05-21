import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-schdule-manager',
  templateUrl: './view-schdule-manager.component.html',
  styleUrls: ['./view-schdule-manager.component.scss']
})
export class ViewSchduleManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService ,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  gateway:any;
  gateways:any;

  mona:any;
  tuea:any;
  weda:any;
  thua:any;
  fria:any;
  sata:any;
  suna:any;

  mond:any;
  tued:any;
  wedd:any;
  thud:any;
  frid:any;
  satd:any;
  sund:any;

  mon1o:any;
  tue1o:any;
  wed1o:any;
  thu1o:any;
  fri1o:any;
  sat1o:any;
  sun1o:any;

  mon1f:any;
  tue1f:any;
  wed1f:any;
  thu1f:any;
  fri1f:any;
  sat1f:any;
  sun1f:any;


  mon2o:any;
  tue2o:any;
  wed2o:any;
  thu2o:any;
  fri2o:any;
  sat2o:any;
  sun2o:any;

  mon2f:any;
  tue2f:any;
  wed2f:any;
  thu2f:any;
  fri2f:any;
  sat2f:any;
  sun2f:any;

  id:any;


  da = {
    "mac_id":  '',
    "name": '',
    "arm":{
        "monday":{
            "arm":'',
            "disarm": ''
        },
        "tuesday":{
            "arm":'',
            "disarm": ''
        },
        "wednesday":{
            "arm":'',
            "disarm": ''
        },
        "thursday":{
            "arm":'',
            "disarm": ''
        },
        "friday":{
            "arm":'',
            "disarm": ''
        },
        "saturday":{
            "arm":'',
            "disarm": ''
        },
        "sunday":{
            "arm":'',
            "disarm": ''
        }
    },
    "relay1":{
        "monday":{
            "on":'',
            "off": ''
        },
        "tuesday":{
            "on":'',
            "off": ''
        },
        "wednesday":{
            "on":'',
            "off": ''
        },
        "thursday":{
            "on":'',
            "off": ''
        },
        "friday":{
            "on":'',
            "off": ''
        },
        "saturday":{
            "on":'',
            "off": ''
        },
        "sunday":{
            "on":'',
            "off": ''
        }
    },
    "relay2":{
      "monday":{
          "on":'',
          "off": ''
      },
      "tuesday":{
          "on":'',
          "off": ''
      },
      "wednesday":{
          "on":'',
          "off":''
      },
      "thursday":{
          "on":'',
          "off":''
      },
      "friday":{
          "on":'',
          "off":''
      },
      "saturday":{
          "on":'',
          "off":''
      },
      "sunday":{
          "on":'',
          "off":''
      }
  },
    "created_by": '',
    "client": ''
}

edit:boolean =false;

  ngOnInit(): void {


    var url = this.router.url.split("/");
    if(url[2] == "editschedule"){
       this.edit = true;
    }else{
      this.edit = false;
    }


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
        
        console.log(data);
          this.gateways = data["data"][0];
  
      });

      this.backend.getiotgatewayschedule(this.id)
      .subscribe((data)=> { 
          console.log("Data:",data);
          this.gateway = data['data'][0].mac_id;
          this.da = data['data'][0];

      });
      


   

  }

  
 


  

  onsubmit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    var spil = this.gateway.split(",");

    var data =  {
      "mac_id":  this.da.mac_id,
      "name": this.da.name,
      "arm":this.da.arm,
      "relay1":this.da.relay1,
      "relay2":this.da.relay2,
      "modify_by": da["name"],
      "client": this.da.client
  }

  console.log(data);
  
    this.backend.updateiotgatewayschedule(data)
    .subscribe((data)=> { 
      console.log(data);
    })

    }


  }





