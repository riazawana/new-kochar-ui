import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Location} from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-schdule-manager',
  templateUrl: './add-schdule-manager.component.html',
  styleUrls: ['./add-schdule-manager.component.scss']
})
export class AddSchduleManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService ,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private _location:Location,
  ) { }

  gateway:any;
  gateways:any = [];

  mona:any= "00:00";
  tuea:any= "00:00";
  weda:any= "00:00";
  thua:any= "00:00";
  fria:any= "00:00";
  sata:any= "00:00";
  suna:any= "00:00";

  mond:any= "00:00";
  tued:any= "00:00";
  wedd:any= "00:00";
  thud:any= "00:00";
  frid:any= "00:00";
  satd:any= "00:00";
  sund:any= "00:00";

  mon1o:any= "00:00";
  tue1o:any= "00:00";
  wed1o:any= "00:00";
  thu1o:any= "00:00";
  fri1o:any= "00:00";
  sat1o:any= "00:00";
  sun1o:any= "00:00";

  mon1f:any= "00:00";
  tue1f:any= "00:00";
  wed1f:any= "00:00";
  thu1f:any= "00:00";
  fri1f:any= "00:00";
  sat1f:any= "00:00";
  sun1f:any= "00:00";


  mon2o:any= "00:00";
  tue2o:any= "00:00";
  wed2o:any= "00:00";
  thu2o:any= "00:00";
  fri2o:any= "00:00";
  sat2o:any= "00:00";
  sun2o:any= "00:00";

  mon2f:any= "00:00";
  tue2f:any= "00:00";
  wed2f:any= "00:00";
  thu2f:any= "00:00";
  fri2f:any= "00:00";
  sat2f:any= "00:00";
  sun2f:any= "00:00";

  clear(x){
    if(x == "mona"){
        this.mona = "00:00"
    }if(x == "tuea"){
       this.tuea = "00:00"
   }if(x == "weda"){
       this.weda = "00:00"
   }if(x == "thua"){
       this.thua = "00:00"
   }if(x == "fria"){
       this.fria = "00:00"
   }if(x == "sata"){
       this.sata = "00:00"
   }if(x == "suna"){
       this.suna = "00:00"
   } if(x == "mond"){
       this.mond = "00:00"
   }if(x == "tued"){
      this.tued = "00:00"
  }if(x == "wedd"){
      this.wedd = "00:00"
  }if(x == "thud"){
      this.thud = "00:00"
  }if(x == "frid"){
      this.frid = "00:00"
  }if(x == "satd"){
      this.satd = "00:00"
  }if(x == "sund"){
      this.sund = "00:00"
  }


  if(x == "mon1o"){
   this.mon1o = "00:00"
}if(x == "tue1o"){
  this.tue1o = "00:00"
}if(x == "wed1o"){
  this.wed1o = "00:00"
}if(x == "thu1o"){
  this.thu1o = "00:00"
}if(x == "fri1o"){
  this.fri1o = "00:00"
}if(x == "sat1o"){
  this.sat1o = "00:00"
}if(x == "sun1o"){
  this.sun1o = "00:00"
}
if(x == "mon1f"){
   this.mon1f = "00:00"
}if(x == "tue1f"){
  this.tue1f = "00:00"
}if(x == "wed1f"){
  this.wed1f = "00:00"
}if(x == "thu1f"){
  this.thu1f = "00:00"
}if(x == "fri1f"){
  this.fri1f = "00:00"
}if(x == "sat1f"){
  this.sat1f = "00:00"
}if(x == "sun1f"){
  this.sun1f = "00:00"
}


if(x == "mon2o"){
   this.mon2o = "00:00"
}if(x == "tue2o"){
  this.tue2o = "00:00"
}if(x == "wed2o"){
  this.wed2o = "00:00"
}if(x == "thu2o"){
  this.thu2o = "00:00"
}if(x == "fri2o"){
  this.fri2o = "00:00"
}if(x == "sat2o"){
  this.sat2o = "00:00"
}if(x == "sun2o"){
  this.sun2o = "00:00"
}
if(x == "mon2f"){
   this.mon2f = "00:00"
}if(x == "tue2f"){
  this.tue2f = "00:00"
}if(x == "wed2f"){
  this.wed2f = "00:00"
}if(x == "thu2f"){
  this.thu2f = "00:00"
}if(x == "fri2f"){
  this.fri2f = "00:00"
}if(x == "sat2f"){
  this.sat2f = "00:00"
}if(x == "sun2f"){
  this.sun2f = "00:00"
}

 }
 copy(x,y){
       
   if(y == 'a'){
       this.mona = x;
       this.tuea = x;
       this.weda = x;
       this.thua = x;
       this.fria = x;
       this.sata = x;
       this.suna = x;
   } if(y == 'aa'){
       this.mond = x;
       this.tued = x;
       this.wedd = x;
       this.thud = x;
       this.frid = x;
       this.satd = x;
       this.sund = x;
   }if(y == 'b'){
       this.mon1o = x;
       this.tue1o = x;
       this.wed1o = x;
       this.thu1o = x;
       this.fri1o = x;
       this.sat1o = x;
       this.sun1o = x;
   }
       if(y == 'bb'){
       this.mon1f = x;
       this.tue1f = x;
       this.wed1f = x;
       this.thu1f = x;
       this.fri1f = x;
       this.sat1f = x;
       this.sun1f = x;
   }
   if(y == 'c'){
       this.mon2o = x;
       this.tue2o = x;
       this.wed2o = x;
       this.thu2o = x;
       this.fri2o = x;
       this.sat2o = x;
       this.sun2o = x;
   } if(y == 'cc'){
       this.mon2f = x;
       this.tue2f = x;
       this.wed2f = x;
       this.thu2f = x;
       this.fri2f = x;
       this.sat2f = x;
       this.sun2f = x;
   }
 }


  ngOnInit(): void {
    this.ngxLoader.start();

    this.gateways = [];
      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
    this.ngxLoader.stop();

        //console.log("All gateways:",data["data"]);
        for(var i = 0; i < data["data"].length; i++)
        {
          this.gateways = this.gateways.concat(data["data"][i]);
        }
        //console.log("All gateways:",this.gateways);
      });
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

  //console.log(data);
  
    this.backend.addiotgatewayschedule(data)
    .subscribe((data)=> { 
      //console.log(data);

      if(data["success"] == true){
          Swal.fire("Schedule added successfully");
        this._location.back();

       }else{
        // if(data["msg"] == "sms settings already exists for the selected mac id")
        Swal.fire("Schedule already exists");
        this._location.back();

       }
    })

    }


    cancel(){
        this._location.back();
    }

  }




