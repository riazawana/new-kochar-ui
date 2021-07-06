import { Component, OnInit,Inject } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import {SocketioSendmsgService} from "../../socketio-sendmsg.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommandSettingSmartmeterComponent } from '../../command-setting-smartmeter/command-setting-smartmeter.component';  

@Component({
  selector: 'app-smart-meter',
  templateUrl: './smart-meter.component.html',
  styleUrls: ['./smart-meter.component.scss']
})
export class SmartMeterComponent implements OnInit {


   
   
 
   constructor(private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private soc:SocketioSendmsgService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CommandSettingSmartmeterComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    id:string;
   modbus:any;
   faMapMarker = faMapMarkerAlt;

   panelOpenState = false;

   


  

   onNoClick(): void {
    this.dialogRef.close();
  }


  /////////////////////////modal 2/////////////////////////////////////
     openDialog(id,v): void {
      //  alert(id)
       const dialogRef = this.dialog.open(CommandSettingSmartmeterComponent, {
         width: '600px',
         data: {id: id,v:v}    
       },
       );

       dialogRef.afterClosed().subscribe(result => {
        //  console.log('The dialog  two was closed');
       });
     }
   
  ngOnInit(): void {

    this.ngxLoader.start();
   

    this.backend.getmodbususerwise()
    .subscribe((data)=> { 

    this.ngxLoader.stop();

        //console.log("Modbus",data["data"]);
       this.modbus = data["data"];

      //  this.smartmeterval = {}

       for(var i = 0; i<this.modbus.length;i++){
         if(this.modbus[i].gateways.length != 0){
          for(var j = 0; j<this.modbus[i].gateways.length;j++){

         if(this.modbus[i].gateways[j].smartmeter.length != 0){

            for(var k = 0; k<this.modbus[i].gateways[j].smartmeter.length;k++){
               var smartmeterlogs_current = this.modbus[i].gateways[j].smartmeter[k].smartmeterlogs_current
               var smartmeterlogs_monthly = this.modbus[i].gateways[j].smartmeter[k].smartmeterlogs_monthly
               var smartmeterlogs_today = this.modbus[i].gateways[j].smartmeter[k].smartmeterlogs_today
             

            if(this.modbus[i].gateways[j].smartmeter[k].meter_type == "EM1320"){

              if((smartmeterlogs_current.length != 0)&&(smartmeterlogs_monthly.length != 0)&&(smartmeterlogs_today.length != 0)){
         
                if((smartmeterlogs_monthly[0].data14 == "")&&(smartmeterlogs_current[0].data14 == "")){
                  this.smartmeterval.push({'kwhm':["0","0","0","0","0","0","0"]}) 
    
                  }
                  else{
                    if(smartmeterlogs_current[0].data14 == ""){
                      var da = 0 - parseInt(smartmeterlogs_monthly[0].data14,10);
                      var daa = this.padLeadingZeros(da)
                      this.smartmeterval.push({'kwhm':(daa.toString()).split("")}) 
                      }
                      if(smartmeterlogs_monthly[0].data14 == ""){
                       var da =  parseInt(smartmeterlogs_current[0].data14,10) - 0;
                      var daa = this.padLeadingZeros(da)
    
                       this.smartmeterval.push({'kwhm':(daa.toString()).split("")})
    
                        }
                        else{
                          var da = parseInt(smartmeterlogs_current[0].data14,10)-parseInt(smartmeterlogs_monthly[0].data14,10)
                          var daa = this.padLeadingZeros(da)
                          this.smartmeterval.push({'kwhm':(daa.toString()).split("")})  
                        }
                  }
                
    
              
                  if((smartmeterlogs_today[0].data14 == "")&&(smartmeterlogs_current[0].data14 == "")){
                    this.smartmeterval.push({'kwht':["0","0","0","0","0","0","0"]})
                    }else{
                      if(smartmeterlogs_current[0].data14 == ""){
                       var da = 0 - parseInt(smartmeterlogs_today[0].data14,10)
                      var daa = this.padLeadingZeros(da)
    
                       this.smartmeterval.push({'kwht':(daa.toString()).split("")})
                        }
                        if(smartmeterlogs_today[0].data14 == ""){
                          var da =  parseInt(smartmeterlogs_current[0].data14,10) - 0
                      var daa = this.padLeadingZeros(da)
    
                          this.smartmeterval.push({'kwht':(daa.toString()).split("")})
                          } else{
                            var da = parseInt(smartmeterlogs_current[0].data14,10)-parseInt(smartmeterlogs_today[0].data14,10)
                      var daa = this.padLeadingZeros(da)
                            
                            this.smartmeterval.push({'kwht':(daa.toString()).split("")})  
                          }
                    }
                  
    
          
             }
    
             if((smartmeterlogs_current.length != 0)&&(smartmeterlogs_monthly.length != 0)&&(smartmeterlogs_today.length != 0)){
             
              if((smartmeterlogs_monthly[0].data12 == "")&&(smartmeterlogs_current[0].data12 == "")){
                this.smartmeterval.push({'kvhm':0}) 
    
                }
                else{
                  if(smartmeterlogs_current[0].data12 == ""){
                    var da = 0 - parseInt(smartmeterlogs_monthly[0].data12,10);
    
                    this.smartmeterval.push({'kvhm':da}) 
                    }
                    if(smartmeterlogs_monthly[0].data12 == ""){
                     var da =  parseInt(smartmeterlogs_current[0].data12,10) - 0;
    
                     this.smartmeterval.push({'kvhm':da})
    
                      }
                      else{
                        var da = parseInt(smartmeterlogs_current[0].data12,10)-parseInt(smartmeterlogs_monthly[0].data12,10)
    
                        this.smartmeterval.push({'kvhm':da})  
                      }
                }
              
    
            
                if((smartmeterlogs_today[0].data12 == "")&&(smartmeterlogs_current[0].data12 == "")){
                  this.smartmeterval.push({'kvht':"0"})
                  }else{
                    if(smartmeterlogs_current[0].data12 == ""){
                     var da = 0 - parseInt(smartmeterlogs_today[0].data12,10)
    
                     this.smartmeterval.push({'kvht':da})
                      }
                      if(smartmeterlogs_today[0].data12 == ""){
                        var da =  parseInt(smartmeterlogs_current[0].data12,10) - 0
    
                        this.smartmeterval.push({'kvht':da})
                        } else{
                          var da = parseInt(smartmeterlogs_current[0].data12,10)-parseInt(smartmeterlogs_today[0].data12,10)
                          
                          this.smartmeterval.push({'kvht':da})  
                        }
                  }
                 
    
          //  console.log("this.smartmeterval:",this.smartmeterval)
         
           }
    
           //console.log("this.smartmeterval:",this.smartmeterval);
           this.gatewaydata.push(this.smartmeterval);
           this.smartmeterval = []

            }else{

              if((smartmeterlogs_current.length != 0)&&(smartmeterlogs_monthly.length != 0)&&(smartmeterlogs_today.length != 0)){
         
                if((smartmeterlogs_monthly[0].data1 == "")&&(smartmeterlogs_current[0].data1 == "")){
                  this.smartmeterval.push({'kwhm':["0","0","0","0","0","0","0"]}) 
    
                  }
                  else{
                    if(smartmeterlogs_current[0].data1 == ""){
                      var da = 0 - parseInt(smartmeterlogs_monthly[0].data1,10);
                      var daa = this.padLeadingZeros(da)
                      this.smartmeterval.push({'kwhm':(daa.toString()).split("")}) 
                      }
                      if(smartmeterlogs_monthly[0].data1 == ""){
                       var da =  parseInt(smartmeterlogs_current[0].data1,10) - 0;
                      var daa = this.padLeadingZeros(da)
    
                       this.smartmeterval.push({'kwhm':(daa.toString()).split("")})
    
                        }
                        else{
                          var da = parseInt(smartmeterlogs_current[0].data1,10)-parseInt(smartmeterlogs_monthly[0].data1,10)
                          var daa = this.padLeadingZeros(da)
                          this.smartmeterval.push({'kwhm':(daa.toString()).split("")})  
                        }
                  }
                
    
              
                  if((smartmeterlogs_today[0].data1 == "")&&(smartmeterlogs_current[0].data1 == "")){
                    this.smartmeterval.push({'kwht':["0","0","0","0","0","0","0"]})
                    }else{
                      if(smartmeterlogs_current[0].data1 == ""){
                       var da = 0 - parseInt(smartmeterlogs_today[0].data1,10)
                      var daa = this.padLeadingZeros(da)
    
                       this.smartmeterval.push({'kwht':(daa.toString()).split("")})
                        }
                        if(smartmeterlogs_today[0].data1 == ""){
                          var da =  parseInt(smartmeterlogs_current[0].data1,10) - 0
                      var daa = this.padLeadingZeros(da)
    
                          this.smartmeterval.push({'kwht':(daa.toString()).split("")})
                          } else{
                            var da = parseInt(smartmeterlogs_current[0].data1,10)-parseInt(smartmeterlogs_today[0].data1,10)
                      var daa = this.padLeadingZeros(da)
                            
                            this.smartmeterval.push({'kwht':(daa.toString()).split("")})  
                          }
                    }
                  
    
          
             }
    
             if((smartmeterlogs_current.length != 0)&&(smartmeterlogs_monthly.length != 0)&&(smartmeterlogs_today.length != 0)){
             
              if((smartmeterlogs_monthly[0].data2 == "")&&(smartmeterlogs_current[0].data2 == "")){
                this.smartmeterval.push({'kvhm':0}) 
    
                }
                else{
                  if(smartmeterlogs_current[0].data2 == ""){
                    var da = 0 - parseInt(smartmeterlogs_monthly[0].data2,10);
    
                    this.smartmeterval.push({'kvhm':da}) 
                    }
                    if(smartmeterlogs_monthly[0].data2 == ""){
                     var da =  parseInt(smartmeterlogs_current[0].data2,10) - 0;
    
                     this.smartmeterval.push({'kvhm':da})
    
                      }
                      else{
                        var da = parseInt(smartmeterlogs_current[0].data2,10)-parseInt(smartmeterlogs_monthly[0].data2,10)
    
                        this.smartmeterval.push({'kvhm':da})  
                      }
                }
              
    
            
                if((smartmeterlogs_today[0].data2 == "")&&(smartmeterlogs_current[0].data2 == "")){
                  this.smartmeterval.push({'kvht':"0"})
                  }else{
                    if(smartmeterlogs_current[0].data2 == ""){
                     var da = 0 - parseInt(smartmeterlogs_today[0].data2,10)
    
                     this.smartmeterval.push({'kvht':da})
                      }
                      if(smartmeterlogs_today[0].data2 == ""){
                        var da =  parseInt(smartmeterlogs_current[0].data2,10) - 0
    
                        this.smartmeterval.push({'kvht':da})
                        } else{
                          var da = parseInt(smartmeterlogs_current[0].data2,10)-parseInt(smartmeterlogs_today[0].data2,10)
                          
                          this.smartmeterval.push({'kvht':da})  
                        }
                  }
                 
    
          //  console.log("this.smartmeterval:",this.smartmeterval)
         
           }
    
           //console.log("this.smartmeterval:",this.smartmeterval);
           this.gatewaydata.push(this.smartmeterval);
           this.smartmeterval = []

            }

             
            }

         }
         
         //console.log("this.gatewaydata:",this.gatewaydata)
  
            }

         this.finalmodbus.push(this.gatewaydata);


         }
        
       }


        //console.log(this.finalmodbus)

    });



  }


   padLeadingZeros(num) {
    var s = num+"";
    while (s.length < 7) s = "0" + s;
    return s;
}
  smartmeterval:any = [];
  gatewaydata:any = [];
  finalmodbus:any=[]

  addsmartmeter(x,y){
      // alert(x);
      this.router.navigate(['/kochar/Energy Management/addsmartmeter',x,y])

  }





  

}
