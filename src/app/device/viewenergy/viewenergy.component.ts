import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-viewenergy',
  templateUrl: './viewenergy.component.html',
  styleUrls: ['./viewenergy.component.scss']
})
export class ViewenergyComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  id:string;
  client:any;
  
  ngOnInit(): void {
    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.client = params.get("client");
     // alert(this.id)
      })
     
    this.backend.getmodbus(this.id,this.client)
    .subscribe((data)=> { 

    this.ngxLoader.stop();

       console.log("User Data",data);
      
   

    });
    

  }

  
  

  

}


