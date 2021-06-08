import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-gatways-status',
  templateUrl: './gatways-status.component.html',
  styleUrls: ['./gatways-status.component.scss']
})


export class GatwaysStatusComponent implements AfterViewInit {

  

  

  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router
  ) {
  }

  gateways:any;

  ngAfterViewInit() {

    this.ngxLoader.start();

    var da = JSON.parse(sessionStorage.getItem('userdata'));


    this.backend.getgatewayuserwise()
    .subscribe((data)=> { 

    this.ngxLoader.stop();

      // console.log("All gateways:",data["data"]);

       this.gateways = data["data"][0];
   

    });

   
  }

  

 
}

