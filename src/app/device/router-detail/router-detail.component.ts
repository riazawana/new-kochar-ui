import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';

@Component({
  selector: 'app-router-detail',
  templateUrl: './router-detail.component.html',
  styleUrls: ['./router-detail.component.scss']
})
export class RouterDetailComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private route: ActivatedRoute,
    private router: Router) { }

  
  id:any;
  data:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");

      this.backend.getrouter(this.id)
      .subscribe((data)=> { 
          console.log("Data:",data);

          this.data = data["data"];
      });

      })

     

  }

  reboot(){

  }
analysis(x,y)
{
  
  this.router.navigate(['/kochar/Devices/analysis',x,y]);

}

firmware(x){
  alert(x);
  this.backend.routerfirmwareupdate(x)
  .subscribe((data)=> { 
      // console.log("Data:",data["data"]);
  });
}


}
