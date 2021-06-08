import { Component, OnInit,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-schdule-manager',
  templateUrl: './schdule-manager.component.html',
  styleUrls: ['./schdule-manager.component.scss']
})
export class SchduleManagerComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService,
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
    this.ngxLoader.start();

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

    // this.backend.getgatewayuserwise()
    // .subscribe((data)=> { 
      
    //   console.log(data);
    //     this.gateways = data["data"][0];

    // });

    this.getgatewaydata();
    
  }

  getgatewaydata(){

    this.ngxLoader.stop();

    this.gateways = [];
    this.backend.getgatewayuserwise()
    .subscribe((data)=> { 
      console.log("All gateways:",data["data"]);


      
      for(var i = 0; i < data["data"].length; i++)
      {
        this.gateways = this.gateways.concat(data["data"][i]);
      }
      
   

      console.log("All gateways:",this.gateways);

    });
  }

  schdata:any = [];

  getdata(x){
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


  // deletefun(x,y){
  //   this.backend.deleteiotgatewayschedule(x)
  //   .subscribe((data)=> { 
      
  //     console.log(data);

  //   });
  // }

  deletefun(x){
    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Schedule!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

           this.backend.deleteiotgatewayschedule(x)
    .subscribe((data)=> { 
      this.gateways = [];
      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
        console.log("All gateways:",data["data"]);
        for(var i = 0; i < data["data"].length; i++)
        {
          this.gateways = this.gateways.concat(data["data"][i]);
        }
        console.log("All gateways:",this.gateways);
      });
        console.log(data);
        this.getdata(x);
        
        
      Swal.fire(
        'Deleted!',
        'Schedule has been deleted.',
        'success'
      )
    });         
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Schedule is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }

  addfun(){
    this.router.navigate(['/kochar/IOT Gateway/addschedule']);

  }

 
}
