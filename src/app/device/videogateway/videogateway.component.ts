import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-videogateway',
  templateUrl: './videogateway.component.html',
  styleUrls: ['./videogateway.component.scss']
})
export class VideogatewayComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

    videolist:any;
  id:any;
  idz:any;

  ngOnInit(): void {

    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.idz = params.get("idz");

      })

      this.getvideo();
  }

  getvideo(){
    this.ngxLoader.stop();

    this.backend.getvideogatewaylocationwise(this.id)
    .subscribe((data)=> { 
         //console.log("Data:",data["data"]);
       this.videolist = data["data"];
      

    });
  }

  addvideo(x = this.id){
    // this.router.navigate(['/kochar/Devices/addvideogateway',x]);
  this.router.navigate(['/kochar/Devices/addvideogateway',this.idz,this.id]);

  }

  openvideo(x){
     this.router.navigate(['/kochar/Devices/viewvideo',x]);
  }


  delete(x,y){
    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Video Gateway!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

           this.backend.deletevideogateways(x,y)
    .subscribe((data)=> { 

        //console.log(data);
      this.getvideo();
      Swal.fire(
        'Deleted!',
        'Video Gateway has been deleted.',
        'success'
      )
    });         
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Video Gateway is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }


  edit(x,){
    this.router.navigate(['/kochar/Devices/editvideogateway',x]);

  }

}
