import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-routers',
  templateUrl: './routers.component.html',
  styleUrls: ['./routers.component.scss']
})
export class RoutersComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

  routerslist:any;
  id:any;

  ngOnInit(): void {
    this.ngxLoader.start();
   
    this.getdata();

  }

  getdata(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getrouterlocationwise(this.id)
      .subscribe((data)=> { 

    this.ngxLoader.stop();

           console.log("Data:",data["data"]);
         this.routerslist = data["data"];
        
  
      });
  }

  addrouter(x = this.id){
    this.router.navigate(['/kochar/Devices/addrouter',x]);
  }

  openrouter(x){
    this.router.navigate(['/kochar/Devices/openrouter',x]);
  }


  // delete(x,y){
  //   this.backend.deleterouter(x,y)
  //   .subscribe((data)=> { 
  //       console.log(data);
  //   });
  // }

  delete(x,y){

    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
      
  
   
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Router!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
  
           this.backend.deleterouter(x,y)
    .subscribe((data)=> { 
  
        console.log(data);
      this.getdata();
      Swal.fire(
        'Deleted!',
        'Router has been deleted.',
        'success'
      )
    });
          
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Router is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }

  edit(x,y){
    this.router.navigate(['/kochar/Devices/editrouter',x]);

  }

}
