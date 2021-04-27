import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-schdule-manager',
  templateUrl: './add-schdule-manager.component.html',
  styleUrls: ['./add-schdule-manager.component.scss']
})
export class AddSchduleManagerComponent implements OnInit {

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




  ngOnInit(): void {
   // console.log(sessionStorage.getItem('userdata'));
   // console.log(sessionStorage.getItem('token'));
    

    this.backend.getgatewayuserwise()
    .subscribe((data)=> { 
     console.log(data);
     this.gateways = data["data"];
     

    })

   

  }

  
 


  

  onsubmit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    var spil = this.gateway.split(",");

    var data = {
      "mac_id":  spil[1],
      "name": spil[0],
      "arm":{
          "monday":{
              "arm":this.mona,
              "disarm": this.mond
          },
          "tuesday":{
              "arm":this.tuea,
              "disarm": this.tued
          },
          "wednesday":{
              "arm":this.weda,
              "disarm": this.wedd
          },
          "thursday":{
              "arm":this.thua,
              "disarm": this.thud
          },
          "friday":{
              "arm":this.fria,
              "disarm": this.frid
          },
          "saturday":{
              "arm":this.sata,
              "disarm": this.satd
          },
          "sunday":{
              "arm":this.suna,
              "disarm": this.sund
          }
      },
      "relay1":{
          "monday":{
              "on":this.mon1o,
              "off": this.mon1f
          },
          "tuesday":{
              "on":this.tue1o,
              "off": this.tue1f
          },
          "wednesday":{
              "on":this.wed1o,
              "off": this.wed1f
          },
          "thursday":{
              "on":this.thu1o,
              "off": this.thu1f
          },
          "friday":{
              "on":this.fri1o,
              "off": this.fri1f
          },
          "saturday":{
              "on":this.sat1o,
              "off": this.sat1f
          },
          "sunday":{
              "on":this.sun1o,
              "off": this.sun1f
          }
      },
      "relay2":{
        "monday":{
            "on":this.mon2o,
            "off": this.mon2f
        },
        "tuesday":{
            "on":this.tue2o,
            "off": this.tue2f
        },
        "wednesday":{
            "on":this.wed2o,
            "off": this.wed2f
        },
        "thursday":{
            "on":this.thu2o,
            "off": this.thu2f
        },
        "friday":{
            "on":this.fri2o,
            "off": this.fri2f
        },
        "saturday":{
            "on":this.sat2o,
            "off": this.sat2f
        },
        "sunday":{
            "on":this.sun2o,
            "off": this.sun2f
        }
    },
      "created_by": da["name"],
      "client": spil[2]
  }

  console.log(data);
  
    this.backend.addiotgatewayschedule(data)
    .subscribe((data)=> { 
      console.log(data);
    })

    }


  }




