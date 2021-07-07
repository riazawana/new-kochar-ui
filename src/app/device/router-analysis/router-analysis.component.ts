

import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendconnectionService } from '../../backendconnection.service';

@Component({
  selector: 'app-router-analysis',
  templateUrl: './router-analysis.component.html',
  styleUrls: ['./router-analysis.component.scss']
})
export class RouterAnalysisComponent implements OnInit {

  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

  
  id:any;
  mac:any;
  data:any;
  video:any;
  iot:any;

  
  formatMAC(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.mac= str.slice(0, 17);
  };

  formatMAC_iot(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.iot= str.slice(0, 17);
  };


  formatMAC_video(e) {
    // alert(e);
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.replace(/[^a-f0-9]/ig, "");
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }
    this.video= str.slice(0, 17);
  };

  ngOnInit(): void {

    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.mac = params.get("mac");
  

      })

    this.ngxLoader.stop();
     

  }

  result:any = "";

  cmmd(x){
        var data = {
          "gl_mac_id":this.mac,
          "cmd": x
        }

        //console.log(data);
         
        this.backend.executeshellcommand(data)
        .subscribe((data)=> { 
            //console.log("Data:",data);
             this.result = data["data"];
        });


  }
 




}
