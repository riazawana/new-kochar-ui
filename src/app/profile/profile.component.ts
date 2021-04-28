import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;
  email: any;
  role: any;

  constructor() { }

  ngOnInit(): void {
   var userdata =  JSON.parse(sessionStorage.getItem('userdata'));
    
   this.name = userdata.name;
   this.email = userdata.email;
   this.role = userdata.realm_access.roles[0];


  }

}
