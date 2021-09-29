import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-energy-meter',
  templateUrl: './energy-meter.component.html',
  styleUrls: ['./energy-meter.component.scss']
})
export class EnergyMeterComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

    energylist:any;
  id:any;

  ngOnInit(): void {

    this.ngxLoader.start();

    this.getdata();

  }

  getdata(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getmodbuslocationwise(this.id)
      .subscribe((data)=> { 

    this.ngxLoader.stop();

           //console.log("Data:",data["data"]);
         this.energylist = data["data"];
        
  
      });
  }

  addenergy(x = this.id){
    this.router.navigate(['/kochar/Devices/addenergy',x]);
  }

  openenergy(x,y){
    // alert(x)
    this.router.navigate(['/kochar/Devices/viewenergy',x,y]);
  }



  delete(x,y){

    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
      
  
   
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Energymeter!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
  
           this.backend.deletemodbus(x,y)
    .subscribe((data)=> { 
  
      //  console.log(data);
      this.getdata();
      Swal.fire(
        'Deleted!',
        'Energymeter has been deleted.',
        'success'
      )
    });
          
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Gateway is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }
  

  edit(x,y){
    this.router.navigate(['/kochar/Devices/editenergymeter',x,y]);

  }

}
