import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-schdule-manager',
  templateUrl: './add-schdule-manager.component.html',
  styleUrls: ['./add-schdule-manager.component.css']
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
              "arm":this.mon1o,
              "disarm": this.mon1f
          },
          "tuesday":{
              "arm":this.tue1o,
              "disarm": this.tue1f
          },
          "wednesday":{
              "arm":this.wed1o,
              "disarm": this.wed1f
          },
          "thursday":{
              "arm":this.thu1o,
              "disarm": this.thu1f
          },
          "friday":{
              "arm":this.fri1o,
              "disarm": this.fri1f
          },
          "saturday":{
              "arm":this.sat1o,
              "disarm": this.sat1f
          },
          "sunday":{
              "arm":this.sun1o,
              "disarm": this.sun1f
          }
      },
      "relay2":{
        "monday":{
            "arm":this.mon2o,
            "disarm": this.mon2f
        },
        "tuesday":{
            "arm":this.tue2o,
            "disarm": this.tue2f
        },
        "wednesday":{
            "arm":this.wed2o,
            "disarm": this.wed2f
        },
        "thursday":{
            "arm":this.thu2o,
            "disarm": this.thu2f
        },
        "friday":{
            "arm":this.fri2o,
            "disarm": this.fri2f
        },
        "saturday":{
            "arm":this.sat2o,
            "disarm": this.sat2f
        },
        "sunday":{
            "arm":this.sun2o,
            "disarm": this.sun2f
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




