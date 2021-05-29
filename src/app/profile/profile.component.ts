import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendconnectionService } from '../backendconnection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;
  email: any;
  role: any;
  mobile: any;
  user: any;
  address: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private backend: BackendconnectionService
  ) { }

  ngOnInit(): void {
   var userdata =  JSON.parse(sessionStorage.getItem('userdata'));
    
   this.name = userdata.name;
   this.email = userdata.email;
   this.role = userdata.realm_access.roles[0];

   this.backend.getUserInfo(this.email)
   .subscribe((data)=> { 
      console.log("User Data for edit",data);
     this.user = data['data'][0];
      this.mobile = this.user.mobile;
      this.address = this.user.address;
      // this.country_id = this.user.country_id;
      // this.state_id = this.user.state_id;
      // this.city_id = this.user.city_id;
      // this.pincode_id = this.user.pincode_id;
      //  this.keycloak = sessionStorage.getItem("userid");//this.user.keycloak_user_id;
   });

  }

  editinfo(x){
  this.router.navigate(["/kochar/profile/edituser",this.email]);
  }

}
