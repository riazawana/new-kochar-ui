import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-add-sms-manager',
  templateUrl: './add-sms-manager.component.html',
  styleUrls: ['./add-sms-manager.component.scss']
})
export class AddSmsManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService ,
    private ngxLoader: NgxUiLoaderService,
    private router:Router

  ) { }


  gateways:any;
  gateway:any;
    arr:any = [1,2,3,4,5,6,7,8,9,10];
   data = {
    "gateway_id": "",
    "arm_by_platform": [false, false, false,false,false,false,false, false, false, false],
    "disarm_by_platform": [false, false, false,false,false,false,false, false, false, false],
    "offline": [false, false, false,false,false,false,false, false, false, false],
    "online": [false, false, false,false,false,false,false, false, false, false],
    "arm_by_keypad": [false, false, false,false,false,false,false, false, false, false],
    "disarm_by_keypad": [false, false, false,false,false,false,false, false, false, false],
    "arm": {
    "1" :[false, false, false,false,false,false,false, false, false, false],
    "2" :[false, false, false,false,false,false,false, false, false, false],
    "3" :[false, false, false,false,false,false,false, false, false, false],
    "4" :[false, false, false,false,false,false,false, false, false, false],
    "5" :[false, false, false,false,false,false,false, false, false, false],
    "6" :[false, false, false,false,false,false,false, false, false, false],
    "7" :[false, false, false,false,false,false,false, false, false, false],
    "8" :[false, false, false,false,false,false,false, false, false, false],	
    "9" :[false, false, false,false,false,false,false, false, false, false],
    "10" :[false, false, false,false,false,false,false, false, false, false],
    "11" :[false, false, false,false,false,false,false, false, false, false],
    "12" :[false, false, false,false,false,false,false, false, false, false]  
     },
    "disarm": {
      "1" :[false, false, false,false,false,false,false, false, false, false],
      "2" :[false, false, false,false,false,false,false, false, false, false],
      "3" :[false, false, false,false,false,false,false, false, false, false],
      "4" :[false, false, false,false,false,false,false, false, false, false],
      "5" :[false, false, false,false,false,false,false, false, false, false],
      "6" :[false, false, false,false,false,false,false, false, false, false],
      "7" :[false, false, false,false,false,false,false, false, false, false],
      "8" :[false, false, false,false,false,false,false, false, false, false],	
      "9" :[false, false, false,false,false,false,false, false, false, false],
      "10" :[false, false, false,false,false,false,false, false, false, false],
      "11" :[false, false, false,false,false,false,false, false, false, false],
      "12" :[false, false, false,false,false,false,false, false, false, false]  
     },
     "created_by":"",
     "mac_id":"",
     "client":""
    }
   

  ngOnInit(): void {
    // this.backend.getgatewayuserwise()
    // .subscribe((data)=> { 
    //    console.log("Data:",data);
    //     this.gateways = data["data"][0];
    // });
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

  onclick(z,x,y){

 

    if(z == 'arm_by_platform'){
      if(x == 11){
        for(var i = 0; i < 10 ; i++){
           this.data.arm_by_platform[i] = y;
        }
      }
      for(var k = 0; k<this.data.arm_by_platform.length;k++){
        if(k+1 == x){
          this.data.arm_by_platform[k] = y;
        }
      }
    }
    if(z == 'disarm_by_platform'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm_by_platform[i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm_by_platform.length;k++){
        if(k+1 == x){
          this.data.disarm_by_platform[k] = y;
        }
      }
    }
    if(z == 'offline'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.offline[i] = y;
        }
      }
      for(var k = 0; k<this.data.offline.length;k++){
        if(k+1 == x){
          this.data.offline[k] = y;
        }
      }
    }
    if(z == 'online'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.online[i] = y;
        }
      }
      for(var k = 0; k<this.data.online.length;k++){
        if(k+1 == x){
          this.data.online[k] = y;
        }
      }
    }
    if(z == 'arm_by_keypad'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm_by_keypad[i] = y;
        }
      }
      for(var k = 0; k<this.data.arm_by_keypad.length;k++){
        if(k+1 == x){
          this.data.arm_by_keypad[k] = y;
        }
      }
    }
    if(z == 'disarm_by_keypad'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm_by_keypad[i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm_by_keypad.length;k++){
        if(k+1 == x){
          this.data.disarm_by_keypad[k] = y;
        }
      }
    }

  }

  arm(z,x,y){

    if(z == 'first'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["1"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["1"].length;k++){
        if(k+1 == x){
          this.data.arm["1"][k] = y;
        }
      }
    }
    if(z == 'second'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["2"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["2"].length;k++){
        if(k+1 == x){
          this.data.arm["2"][k] = y;
        }
      }
    }
    if(z == 'third'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["3"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["3"].length;k++){
        if(k+1 == x){
          this.data.arm["3"][k] = y;
        }
      }
    }
    if(z == 'fourth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["4"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["4"].length;k++){
        if(k+1 == x){
          this.data.arm["4"][k] = y;
        }
      }
    }
    if(z == 'fifth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["5"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["5"].length;k++){
        if(k+1 == x){
          this.data.arm["5"][k] = y;
        }
      }
    }
    if(z == 'sixth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["6"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["6"].length;k++){
        if(k+1 == x){
          this.data.arm["6"][k] = y;
        }
      }
    }
    if(z == 'seventh'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["7"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["7"].length;k++){
        if(k+1 == x){
          this.data.arm["7"][k] = y;
        }
      }
    }
    if(z == 'eighth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["8"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["8"].length;k++){
        if(k+1 == x){
          this.data.arm["8"][k] = y;
        }
      }
    }
    if(z == 'nineth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["9"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["9"].length;k++){
        if(k+1 == x){
          this.data.arm["9"][k] = y;
        }
      }
    }
    if(z == 'tenth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["10"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["10"].length;k++){
        if(k+1 == x){
          this.data.arm["10"][k] = y;
        }
      }
    }if(z == 'eleventh'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["11"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["11"].length;k++){
        if(k+1 == x){
          this.data.arm["11"][k] = y;
        }
      }
    }if(z == 'tewelth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.arm["12"][i] = y;
        }
      }
      for(var k = 0; k<this.data.arm["12"].length;k++){
        if(k+1 == x){
          this.data.arm["12"][k] = y;
        }
      }
    }

    //console.log(this.data)
  }

  disarm(z,x,y){

    if(z == 'first'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["1"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["1"].length;k++){
        if(k+1 == x){
          this.data.disarm["1"][k] = y;
        }
      }
    }
    if(z == 'second'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["2"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["2"].length;k++){
        if(k+1 == x){
          this.data.disarm["2"][k] = y;
        }
      }
    }
    if(z == 'third'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["3"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["3"].length;k++){
        if(k+1 == x){
          this.data.disarm["3"][k] = y;
        }
      }
    }
    if(z == 'fourth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["4"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["4"].length;k++){
        if(k+1 == x){
          this.data.disarm["4"][k] = y;
        }
      }
    }
    if(z == 'fifth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["5"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["5"].length;k++){
        if(k+1 == x){
          this.data.disarm["5"][k] = y;
        }
      }
    }
    if(z == 'sixth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["6"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["6"].length;k++){
        if(k+1 == x){
          this.data.disarm["6"][k] = y;
        }
      }
    }
    if(z == 'seventh'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["7"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["7"].length;k++){
        if(k+1 == x){
          this.data.disarm["7"][k] = y;
        }
      }
    }
    if(z == 'eighth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["8"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["8"].length;k++){
        if(k+1 == x){
          this.data.disarm["8"][k] = y;
        }
      }
    }
    if(z == 'nineth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["9"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["9"].length;k++){
        if(k+1 == x){
          this.data.disarm["9"][k] = y;
        }
      }
    }
    if(z == 'tenth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["10"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["10"].length;k++){
        if(k+1 == x){
          this.data.disarm["10"][k] = y;
        }
      }
    }if(z == 'eleventh'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["11"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["11"].length;k++){
        if(k+1 == x){
          this.data.disarm["11"][k] = y;
        }
      }
    }if(z == 'tewelth'){
      if(x == 11){
        // alert("yes1")
        for(var i = 0; i < 10 ; i++){
           this.data.disarm["12"][i] = y;
        }
      }
      for(var k = 0; k<this.data.disarm["12"].length;k++){
        if(k+1 == x){
          this.data.disarm["12"][k] = y;
        }
      }
    }

  }

  onsubmit(){
    var da = JSON.parse(sessionStorage.getItem('userdata'));
    var datamul = this.gateway.split(",");

    this.data.gateway_id = datamul[0];
    this.data.client = datamul[1];
    this.data.mac_id = datamul[2];
    this.data.created_by = da["name"];


    this.backend.addsmssetting(this.data)
    .subscribe((data)=> { 
       //console.log("Data:",data);
       if(data["success"] == true){
         Swal.fire("SMS Setting added successfully!");
        this.router.navigate(["/kochar/IOT Gateway/SMS Manager"]);
       }
       else{
        if(data["msg"] == "sms settings already exists for the selected mac id"){
          Swal.fire("Sms Setting already exists");
        }
        this.router.navigate(["/kochar/IOT Gateway/SMS Manager"]);
       }
    });

  }
  


 

}
