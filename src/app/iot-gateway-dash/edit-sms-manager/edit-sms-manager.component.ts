import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-sms-manager',
  templateUrl: './edit-sms-manager.component.html',
  styleUrls: ['./edit-sms-manager.component.scss']
})
export class EditSmsManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router
  ) { }


  gateways:any;
  gateway:any;
  mac_id:any;

  
 
  armda :any;
  disarmda:any;
  client:any;

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
     "created_by":""
    }

   
    
  id:any;
  selall = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
  ngOnInit(): void {

    this.ngxLoader.start();


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getsmssetting(this.id)
      .subscribe((data)=> { 
    this.ngxLoader.stop();

         //console.log("Data:",data["data"][0]);
         //console.log("Data:",data);

        //  this.gateway = data["data"][0].gateway_id
         this.gateway = data["data"][0].gateway_id+','+data["data"][0].client+','+data["data"][0].mac_id;
         this.mac_id = data["data"][0].mac_id;
          this.client = data["data"][0].client;
          this.data = data["data"][0];
   
            // console.log(this.selall.length)
          this.checkallfun();


      });
      

    this.gateways = [];
      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
        //console.log("All gateways:",data["data"]);
        for(var i = 0; i < data["data"].length; i++)
        {
          this.gateways = this.gateways.concat(data["data"][i]);
        }
       //console.log("All gateways:",this.gateways);
      });
  }

 
  checkallfun(){
    
    var data = this.data;

    for(var j = 0; j < data.arm_by_platform.length; j++){
      if(  data.arm_by_platform[j] == false ){
            this.selall[0] = false;
      }
      if(  data.disarm_by_platform[j] == false ){
        this.selall[1] = false;
      }
      if(  data.disarm_by_platform[j] == false ){
        this.selall[1] = false;
      }
      if(  data.arm_by_keypad[j] == false ){
        this.selall[2] = false;
      }
      if(  data.disarm_by_keypad[j] == false ){
        this.selall[3] = false;
      }
      if(  data.offline[j] == false ){
        this.selall[4] = false;
      }if(  data.online[j] == false ){
        this.selall[5] = false;
      }
      if(  data.arm['1'][j] == false ){
        this.selall[6] = false;
      }
      if(  data.arm['2'][j] == false ){
        this.selall[7] = false;
      }if(  data.arm['3'][j] == false ){
        this.selall[8] = false;
      }if(  data.arm['4'][j] == false ){
        this.selall[9] = false;
      }if(  data.arm['5'][j] == false ){
        this.selall[10] = false;
      }if(  data.arm['6'][j] == false ){
        this.selall[11] = false;
      }if(  data.arm['7'][j] == false ){
        this.selall[12] = false;
      }if(  data.arm['8'][j] == false ){
        this.selall[13] = false;
      }if(  data.arm['9'][j] == false ){
        this.selall[14] = false;
      }if(  data.arm['10'][j] == false ){
        this.selall[15] = false;
      }if(  data.arm['11'][j] == false ){
        this.selall[16] = false;
      }if(  data.arm['12'][j] == false ){
        this.selall[17] = false;
      }if(  data.disarm['1'][j] == false ){
        this.selall[18] = false;
      }if(  data.disarm['2'][j] == false ){
        this.selall[19] = false;
      }if(  data.disarm['3'][j] == false ){
        this.selall[20] = false;
      }if(  data.disarm['4'][j] == false ){
        this.selall[21] = false;
      }if(  data.disarm['5'][j] == false ){
        this.selall[22] = false;
      }if(  data.disarm['6'][j] == false ){
        this.selall[23] = false;
      }if(  data.disarm['7'][j] == false ){
        this.selall[24] = false;
      }if(  data.disarm['8'][j] == false ){
        this.selall[25] = false;
      }if(  data.disarm['9'][j] == false ){
        this.selall[26] = false;
      }if(  data.disarm['10'][j] == false ){
        this.selall[27] = false;
      }if(  data.disarm['11'][j] == false ){
        this.selall[28] = false;
      }if(  data.disarm['12'][j] == false ){
        this.selall[29] = false;
      }
    }
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
          // alert(k)
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

    this.checkallfun();


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
    this.checkallfun();

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

    this.checkallfun();


  }


  onsubmit(){
    //console.log(this.data);
    var da = JSON.parse(sessionStorage.getItem('userdata')); 
var data = {
  "arm_by_platform": this.data.arm_by_platform,
  "disarm_by_platform": this.data.disarm_by_platform,
  "offline": this.data.offline,
  "online": this.data.online,
  "arm_by_keypad": this.data.arm_by_keypad,
  "disarm_by_keypad": this.data.disarm_by_keypad,
  "arm": this.data.arm,
  "disarm": this.data.disarm,
  "modified_by": da["name"],
  "mac_id": this.mac_id,
  "client": this.client
}


    this.backend.updatesmssetting(data)
    .subscribe((data)=> { 
        //console.log("Data:",data);
        if(data["success"] == true){

           Swal.fire("Updated Successfully!");

          this.router.navigate(["/kochar/IOT Gateway/SMS Manager"]);
         }else{
          Swal.fire(data["msg"]);
         }

    });

  }
 

}
