import { Component, OnInit,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';

@Component({
  selector: 'app-schdule-manager',
  templateUrl: './schdule-manager.component.html',
  styleUrls: ['./schdule-manager.component.scss']
})
export class SchduleManagerComponent implements OnInit {

  constructor(
              private router: Router,
    private backend: BackendconnectionService 
            ){ }

isvalid:boolean=false; 
add:boolean = false;
edit:boolean = false;
view:boolean = false;
delete:boolean = false;

gateways:any;
gateway:any;


  ngOnInit(){

    var role = sessionStorage.getItem('role');

    if(role == 'admin'){
      setTimeout(() => {
         this.add = true;
      this.edit = true;
      this.delete = true;
      this.view = true;
      });
    }else{
    
      setTimeout(() => {
        var features = JSON.parse(sessionStorage.getItem('features'));
        for(var i = 0; i < features.length; i++){
          if(features[i].feature_name == 'Schedule Manager'){
             if(features[i].add == true){
            this.add = true;
             }
             if(features[i].view == true){
              this.view = true;
               }
               if(features[i].edit == true){
                this.edit = true;
                 }if(features[i].delete == true){
                  this.delete = true;
                   }
    
          } 
        }
        
       }, 1);
    }

    this.backend.getgatewayuserwise()
    .subscribe((data)=> { 
      
      console.log(data);
        this.gateways = data["data"];

    });
    
  }

  schdata:any = [];

  getdata(x,y){
    this.backend.getiotgatewayschedule(x)
    .subscribe((data)=> { 
      
      console.log(data);
        this.schdata = data["data"];

    });
  }
 

  viewfun(x,y){
    this.router.navigate(['/kochar/IOT Gateway/viewschedule',x,y]);

  }


  editfun(x,y){
    this.router.navigate(['/kochar/IOT Gateway/editschedule',x,y]);

  }


  deletefun(x,y){
    this.backend.deleteiotgatewayschedule(x)
    .subscribe((data)=> { 
      
      console.log(data);

    });
  }

  addfun(){
    this.router.navigate(['/kochar/IOT Gateway/addschedule']);

  }

}
