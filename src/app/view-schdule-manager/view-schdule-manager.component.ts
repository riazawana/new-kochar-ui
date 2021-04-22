import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-schdule-manager',
  templateUrl: './view-schdule-manager.component.html',
  styleUrls: ['./view-schdule-manager.component.css']
})
export class ViewSchduleManagerComponent implements OnInit {

  constructor(
    private backend: BackendconnectionService,
    private route: ActivatedRoute,
    private router:Router
  ) { }


  gateways:any;
  gateway:any;

  id:any;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })

      this.backend.getgatewayuserwise()
      .subscribe((data)=> { 
        
        console.log(data);
          this.gateways = data["data"];
  
      });

      this.backend.getiotgatewayschedule(this.id)
      .subscribe((data)=> { 
          console.log("Data:",data);
      });
      

   
  }

 


 

}
