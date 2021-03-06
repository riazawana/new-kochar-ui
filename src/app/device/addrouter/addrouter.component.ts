
import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Location} from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-addrouter',
  templateUrl: './addrouter.component.html',
  styleUrls: ['./addrouter.component.scss']
})
export class AddrouterComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _location:Location,
    private router:Router) { }

  
  gateway_id:string = "0";


 

 
  location_id:string = "0";
  // router

  r_name:any;
  m_a:any;
  mob:any;
  imsi:any;
  sim:any;


  // tunneling

  gl_mac_id:any;
  d_mac_id:any;
  port:any;

 


 

  zone_id:string;
  location_name:any;
  zone_name:any;
  client:any;

   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  formGroup1: FormGroup;
  formGroup2: FormGroup;

  
  ngOnInit(): void {
    this.ngxLoader.start();

    this.formGroup1 = this.formBuilder.group({
      r_name: ['', [Validators.required,]],
      m_a : ['', [Validators.required,Validators.minLength(17),Validators.maxLength(17)]],
      mob : ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      imsi : ['', [Validators.required,Validators.minLength(15),Validators.maxLength(15)]],
      sim : ['', [Validators.required]],
    })

    this.formGroup2 = this.formBuilder.group({
      gl_mac_id: ['', [Validators.required,]],
      port : ['', [Validators.required]],
      d_mac_id : ['', [Validators.required]],
    })

    this.route.paramMap.subscribe(params => {
      this.location_id = params.get("id");
      })

      this.backend.getlocation(this.location_id)
    .subscribe((data)=> { 

    this.ngxLoader.stop();

    //  console.log(data);
      this.location_name = data["data"][0].name;
      this.zone_name = data["data"][0].zone_name; 
      this.client = data["data"][0].client; 
    })
  }


  selectedIndex: number = 0;

 nextStep(x) {
   
    this.selectedIndex = x;
  }

  previousStep(x) {
  
    this.selectedIndex = x;

  }

  location_list:any;



 
  skip(){
    this._location.back();
  }

 

   
 
  submit_router(){
    
 var da = {
  "name": this.r_name,
  "mac_id": this.m_a,
  "location_id": this.location_id,
  "sim_number": this.mob,
  "imsi_number": this.imsi,
  "sim_operator": this.sim,
  "location_name":this.location_name,
  "zone_name":this.zone_name,
  "client":this.client
 }
    this.backend.addrouter(da)
    .subscribe((data)=> { 
      // console.log("Data:",data);
       //this.location_id = data["location_id"];
       if(data["success"] == true){
          Swal.fire("Router added successfully!"); 
      }else{
        Swal.fire(data["msg"]);
       }
       this.nextStep(1);
    });
  }


  

   flag = false;
  registertunnel(){

    var data = {
      "gl_mac_id":this.gl_mac_id,
      "deviceMacId": this.d_mac_id,
     "ports":{"port1": 80, "port2":554},
     "client":this.client
    }

  
   // console.log(data);

    this.backend.registertunnel(data)
    .subscribe((data)=> { 
     //  console.log("Data:",data);
     if(data["success"] == true){
      Swal.fire("Tunnel Successfull!"); 
  }else{
    Swal.fire(data["msg"]);
   }
       this.flag = true;
    });

  }

  live:any;
  liveport:any;
  liveurl:any;

  getliveport(){
    var x = this.gl_mac_id;
    this.backend.getports(x)
    .subscribe((data)=> { 
       // console.log("Data:",data);
       if(data["success"] == true){
        Swal.fire("Get Live Port Successfull!"); 
    }else{
      Swal.fire(data["msg"]);
     }
       this.live = data["data"];
       this.liveport = data["data"].liveport;
       this.liveurl = data["data"].liveurl;



    });
  }

  copyInputMessage(x) {
    /* Get the text field */
    var copyText = (<HTMLInputElement>document.getElementById(x));
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }


  formatMAC(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.m_a= str.slice(0, 17);
  };


  formatMAC_gl(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.gl_mac_id= str.slice(0, 17);
  };
  

  formatMAC_d(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.d_mac_id= str.slice(0, 17);
  };
  
  
  





}
