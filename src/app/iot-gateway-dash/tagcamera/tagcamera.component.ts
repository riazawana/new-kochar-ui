import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-tagcamera',
  templateUrl: './tagcamera.component.html',
  styleUrls: ['./tagcamera.component.scss']
})
export class TagcameraComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private router:Router) { }

  
    gateways:any;
    gateway:any;
    sensor_name:any;
  ngOnInit(): void {
  
 
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

selgateway(gateway){
    alert(gateway);
     var val = gateway.split(",")
     var cli = val[2] ;
     var mac = val[1];
    this.backend.getdevicecameramapping(mac)
  .subscribe((data)=> { 
    console.log(data)
  })
}

}