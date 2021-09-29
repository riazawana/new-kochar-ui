import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BackendconnectionService } from '../../backendconnection.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-router-detail',
  templateUrl: './router-detail.component.html',
  styleUrls: ['./router-detail.component.scss']
})
export class RouterDetailComponent implements OnInit {
  totalmem: any;
  avilmem:any;
  cached:any;
  constructor( private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

  
  id:any;
  data:any;
  info:any;
  rx_bytes:any;
  tx_bytes:any;

   
  reth0:any;
  rbr_lan:any;
  r3g_wan:any;
  rwwan0:any;
  rtun0:any;
  rwlan0:any;
  rwlan1:any;

  teth0:any;
  tbr_lan:any;
  t3g_wan:any;
  twwan0:any;
  ttun0:any;
  twlan0:any;
  twlan1:any;


  lan_clients:any = [];

  ngOnInit(): void {

    this.ngxLoader.start();

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");

      this.backend.getrouter(this.id)
      .subscribe((data)=> { 
    this.ngxLoader.stop();

          ////console.log("Data:",data);

          this.data = data["data"].result[0];
          this.info =  data["data"].router_info;
          this.rx_bytes = data["data"].router_info.rx_bytes;
          this.tx_bytes = data["data"].router_info.tx_bytes;
          this.totalmem = data["data"].router_info.meminfo[0].split(":")
          this.avilmem  = data["data"].router_info.meminfo[2].split(":")
          this.cached =  data["data"].router_info.meminfo[4].split(":")

          for(var k = 0; k < this.info.lan_clients.length; k++){
               var da = this.info.lan_clients[k].split(" ");
                
               var ada = {
                 a : da[0],
                 b : da[1]
               }

               this.lan_clients.push(ada);
          }

           this.reth0 = this.rx_bytes[0].split("#");
           this.rbr_lan = this.rx_bytes[1].split("#");
           this.r3g_wan = this.rx_bytes[2].split("#");
           this.rwwan0 = this.rx_bytes[3].split("#");
           this.rtun0 = this.rx_bytes[4].split("#");
           this.rwlan0 = this.rx_bytes[5].split("#");
           this.rwlan1 = this.rx_bytes[6].split("#");


           this.teth0 = this.tx_bytes[0].split("#");
           this.tbr_lan = this.tx_bytes[1].split("#");
           this.t3g_wan = this.tx_bytes[2].split("#");
           this.twwan0 = this.tx_bytes[3].split("#");
           this.ttun0 = this.tx_bytes[4].split("#");
           this.twlan0 = this.tx_bytes[5].split("#");
           this.twlan1 = this.tx_bytes[6].split("#");
         
      });

      })

     

  }

  reboot(){
    var data = {
      "gl_mac_id":this.data.mac_id,
      "cmd": "REBOOT"
    }

    ////console.log(data);
     
    this.backend.executeshellcommand(data)
    .subscribe((data)=> { 
        //console.log("Data:",data);
        alert("Command has been schedule successfully, it will take some time!")
    });
  }
analysis(x,y)
{
  
  this.router.navigate(['/kochar/Devices/analysis',x,y]);

}

firmware(x){
  // alert(x);
  this.backend.routerfirmwareupdate(x)
  .subscribe((data)=> { 
       //console.log("Data:",data);
        if(data["success"] == true){
          alert(data["msg"]);
        }else{
          alert(data["msg"]);
         }
  });
}


}
