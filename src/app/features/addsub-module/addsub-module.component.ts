import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Location} from '@angular/common';


@Component({
  selector: 'app-addsub-module',
  templateUrl: './addsub-module.component.html',
  styleUrls: ['./addsub-module.component.scss']
})
export class AddsubModuleComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private _location:Location,
    private router:Router) { }

   moduledata :any;
   name:any;
   Module:any;


  ngOnInit(): void {

      this.backend.getallmodules()
    .subscribe((data)=> { 
     //console.log(data);
      this.moduledata = data["data"];

    })
  }


 onsubmit(){
   var data = {
     name:this.name,
     modulename:this.Module
   }

   //console.log(data);

   this.backend.addsubmodule(data)
    .subscribe((data)=> { 
      //console.log(data);
      if(data["success"] == true){
        Swal.fire("Sub-module added Successfully!");
        this.router.navigate(["/kochar/Features"]);
       }

    })
 }
 
 

  

 cancel(){
  this._location.back();
 }



}
