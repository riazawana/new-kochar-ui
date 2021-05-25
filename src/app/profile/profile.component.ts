import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;
  email: any;
  role: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
   var userdata =  JSON.parse(sessionStorage.getItem('userdata'));
    
   this.name = userdata.name;
   this.email = userdata.email;
   this.role = userdata.realm_access.roles[0];


  }

  editinfo(x){
  this.router.navigate(["/kochar/profile/edituser",this.email]);
  }

}
