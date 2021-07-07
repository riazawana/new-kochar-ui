import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-schdule-manager',
  templateUrl: './view-schdule-manager.component.html',
  styleUrls: ['./view-schdule-manager.component.scss']
})
export class ViewSchduleManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService ,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private _location:Location,

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
disable = true;
  ngOnInit(): void {

    this.ngxLoader.start();

    var url = this.router.url.split("/");
    //console.log(url);
    if(url[3] == "editschedule"){
       this.edit = true;
       this.disable = true;

    }else{
      this.edit = false;
      this.disable = false;

    }


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })



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

      this.backend.getiotgatewayschedule(this.id)
      .subscribe((data)=> { 
          //console.log("Data:",data);
          this.gateway = data['data'][0].mac_id;
          this.da = data['data'][0];

          this.mona = data['data'][0].arm.monday.arm;
          this.tuea = data['data'][0].arm.tuesday.arm;
          this.weda = data['data'][0].arm.wednesday.arm;
          this.thua = data['data'][0].arm.thursday.arm;
          this.fria = data['data'][0].arm.friday.arm;
          this.sata = data['data'][0].arm.saturday.arm;
          this.suna = data['data'][0].arm.sunday.arm;
        
          this.mond = data['data'][0].arm.monday.disarm;
          this.tued = data['data'][0].arm.tuesday.disarm;
          this.wedd = data['data'][0].arm.wednesday.disarm;
          this.thud = data['data'][0].arm.thursday.disarm;
          this.frid = data['data'][0].arm.friday.disarm;
          this.satd = data['data'][0].arm.saturday.disarm;
          this.sund = data['data'][0].arm.sunday.disarm;

          this.mon1o = data['data'][0].relay1.monday.on;
          this.tue1o = data['data'][0].relay1.tuesday.on;
          this.wed1o = data['data'][0].relay1.wednesday.on;
          this.thu1o = data['data'][0].relay1.thursday.on;
          this.fri1o = data['data'][0].relay1.friday.on;
          this.sat1o = data['data'][0].relay1.saturday.on;
          this.sun1o = data['data'][0].relay1.sunday.on;
        
          this.mon1f = data['data'][0].relay1.monday.off;
          this.tue1f = data['data'][0].relay1.tuesday.off;
          this.wed1f = data['data'][0].relay1.wednesday.off;
          this.thu1f = data['data'][0].relay1.thursday.off;
          this.fri1f = data['data'][0].relay1.friday.off;
          this.sat1f = data['data'][0].relay1.saturday.off;
          this.sun1f = data['data'][0].relay1.sunday.off;

          this.mon2o = data['data'][0].relay2.monday.on;
          this.tue2o = data['data'][0].relay2.tuesday.on;
          this.wed2o = data['data'][0].relay2.wednesday.on;
          this.thu2o = data['data'][0].relay2.thursday.on;
          this.fri2o = data['data'][0].relay2.friday.on;
          this.sat2o = data['data'][0].relay2.saturday.on;
          this.sun2o = data['data'][0].relay2.sunday.on;
        
          this.mon2f = data['data'][0].relay2.monday.off;
          this.tue2f = data['data'][0].relay2.tuesday.off;
          this.wed2f = data['data'][0].relay2.wednesday.off;
          this.thu2f = data['data'][0].relay2.thursday.off;
          this.fri2f = data['data'][0].relay2.friday.off;
          this.sat2f = data['data'][0].relay2.saturday.off;
          this.sun2f = data['data'][0].relay2.sunday.off;
      });
      


   

  }

  
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


  

  onsubmit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    var spil = this.gateway.split(",");

     this.da.arm.monday.arm = this.mona;
      this.da.arm.tuesday.arm = this.tuea;
      this.da.arm.wednesday.arm = this.weda;
      this.da.arm.thursday.arm = this.thua;
      this.da.arm.friday.arm = this.fria;
      this.da.arm.saturday.arm = this.sata;
      this.da.arm.sunday.arm = this.suna;

      this.da.arm.monday.disarm = this.mond;
      this.da.arm.tuesday.disarm = this.tued;
      this.da.arm.wednesday.disarm = this.wedd;
      this.da.arm.thursday.disarm = this.thud;
      this.da.arm.friday.disarm = this.frid;
      this.da.arm.saturday.disarm = this.satd;
      this.da.arm.sunday.disarm = this.sund;
  

      this.da.relay1.monday.on = this.mon1o;
      this.da.relay1.tuesday.on = this.tue1o;
      this.da.relay1.wednesday.on = this.wed1o;
      this.da.relay1.thursday.on = this.thu1o;
      this.da.relay1.friday.on = this.fri1o;
      this.da.relay1.saturday.on = this.sat1o;
      this.da.relay1.sunday.on = this.sun1o;
      this.da.relay1.monday.off = this.mon1f;
      this.da.relay1.tuesday.off = this.tue1f;
      this.da.relay1.wednesday.off = this.wed1f;
      this.da.relay1.thursday.off = this.thu1f;
      this.da.relay1.friday.off = this.fri1f;
      this.da.relay1.saturday.off = this.sat1f;
      this.da.relay1.sunday.off = this.sun1f;
  
   
      this.da.relay2.monday.on = this.mon2o;
      this.da.relay2.tuesday.on = this.tue2o;
      this.da.relay2.wednesday.on = this.wed2o;
      this.da.relay2.thursday.on = this.thu2o;
      this.da.relay2.friday.on = this.fri2o;
      this.da.relay2.saturday.on = this.sat2o;
      this.da.relay2.sunday.on = this.sun2o;
      this.da.relay2.monday.off = this.mon2f;
      this.da.relay2.tuesday.off = this.tue2f;
      this.da.relay2.wednesday.off = this.wed2f;
      this.da.relay2.thursday.off = this.thu2f;
      this.da.relay2.friday.off = this.fri2f;
      this.da.relay2.saturday.off = this.sat2f;
      this.da.relay2.sunday.off = this.sun2f;

    var data =  {
      "mac_id":  this.da.mac_id,
      "name": this.da.name,
      "arm":this.da.arm,
      "relay1":this.da.relay1,
      "relay2":this.da.relay2,
      "modify_by": da["name"],
      "client": this.da.client
  }

  //console.log(data);
  
    this.backend.updateiotgatewayschedule(data)
    .subscribe((data)=> { 
      //console.log(data);
      if(data["success"] == true){
        Swal.fire("Schedule updated successfully!");
      this._location.back();

     }
    })

    }

    cancel(){
        this._location.back();
    }
  }





