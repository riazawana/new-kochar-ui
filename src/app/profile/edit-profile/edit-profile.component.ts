import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  edituserformGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  email:string; 
  user:any;
  mobile:string = "";
  address:string = "";
  country_id:string = "";
  city_id:string = "";
  state_id:string = "";
  pincode_id:string = "";
  country_list:any;
  state_list:any;
  city_list:any;
  pin_list:any;
  keycloak:any;


  getcountry(){
    

    this.backend.getcountry()
    .subscribe((data)=> { 
     //  console.log("Data:",data["data"]);
       this.country_list = data["data"];
    });


  }

  ngOnInit(): void {
    
    this.ngxLoader.start();

    this.edituserformGroup = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      country_id: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      pincode_id: ['',[Validators.required]],
    });

    this.getcountry();
    this.route.paramMap.subscribe(params => {
      this.email = params.get("email");
      })
     
    this.backend.getUserInfo(this.email)
    .subscribe((data)=> { 

    this.ngxLoader.stop();

       //console.log("User Data for edit",data);
      this.user = data['data'][0];
       this.mobile = this.user.mobile;
       this.address = this.user.address;
       this.country_id = this.user.country_id;
       this.state_id = this.user.state_id;
       this.city_id = this.user.city_id;
       this.pincode_id = this.user.pincode_id;
        this.keycloak = sessionStorage.getItem("userid");//this.user.keycloak_user_id;

        // alert(this.role_id);
        

       this.getcity(this.state_id);
       this.getpin(this.state_id, this.city_id);
       this.getstate(this.country_id);
    });


  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
  getstate(x){
    
   this.backend.getstate(x)
   .subscribe((data)=> { 
     // console.log("Data:",data["data"]);
      this.state_list = data["data"];
   });

 }

 getcity(x){
   
   this.backend.getcity(x)
   .subscribe((data)=> { 
     // console.log("Data:",data["data"]);
      this.city_list = data["data"];
   });
 }

 getpin(x,y){
   
   this.backend.getpin(x,y)
   .subscribe((data)=> { 
     // console.log("Data:",data["data"]);
      this.pin_list = data["data"];
   });
 }










 onsubmit(){



 
 var data = {
    "mobile": this.mobile,
    "address": this.address,
    "pincode_id": this.pincode_id,
    "country_id": this.country_id,
    "city_id": this.city_id,
    "state_id": this.state_id,
    "keycloak_user_id": this.keycloak,
}

 //console.log(data)
this.backend.updateUserprofile(data)
.subscribe((data)=> { 
    //console.log("Data:",data["data"]);
 
   if(data["success"] == true){
     Swal.fire("User updated successfully!");
    this.router.navigate(["/kochar/profile"]);
   }else{
    Swal.fire(data["msg"]);
   }
});

}

cancel(){
  this.router.navigate(["/kochar/profile"]);
}
}
