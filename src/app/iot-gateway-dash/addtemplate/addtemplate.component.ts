import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-addtemplate',
  templateUrl: './addtemplate.component.html',
  styleUrls: ['./addtemplate.component.scss']
})
export class AddtemplateComponent implements OnInit {

  constructor(private backend:BackendconnectionService,
    private route: ActivatedRoute,
    private router:Router) { }

  template_name:string;
  template_no = 12;

  sensordata12 = [{
    sensor_name:"",
    room_name:"",
    port_number:1,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:2,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:3,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:4,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:5,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:6,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:7,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:8,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:9,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:10,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:11,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:12,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   }
  
  
  ]

  sensordata14 = [{
    sensor_name:"",
    room_name:"",
    port_number:1,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:2,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:3,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:4,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:5,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:6,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:7,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:8,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:9,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:10,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:11,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:12,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },
   {
    sensor_name:"",
    room_name:"",
    port_number:13,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   },{
    sensor_name:"",
    room_name:"",
    port_number:14,
    default_state:0,
    alarm_type:0,
    for_temperature:false,
    sensor_type:"",
   }
  
  
  ]

  tempsensor = [
    {
      sensor_name: "Temp 1",
      room_name: "",
      port_number: 1,
      default_state: 0,
      gateway_id: "",
      alarm_type: 0,
      for_temperature: true,
      sensor_type: "temperature sensor"
    },
    {
      sensor_name: "Temp 2",
      room_name: "",
      port_number: 2,
      default_state: 0,
      alarm_type: 0,
      for_temperature: true,
      sensor_type: "temperature sensor"
    }
  ]

  sensordata:any;
 

  ngOnInit(): void {
    if(this.template_no == 12){
      this.sensordata = this.sensordata12;
    }else{
      this.sensordata = this.sensordata14;
    }
  }

   gateway_type:any;
 
   submit_port(){
    var data;

    if(this.template_no == 12){
      this.sensordata = this.sensordata12;
      this.gateway_type = "IN-12"
      data = this.sensordata.concat(this.tempsensor);
    }else{
      this.sensordata = this.sensordata14;
      this.gateway_type = "IN-14"
      data = this.sensordata;
    }
    var da = JSON.parse(sessionStorage.getItem('userdata'));

    //console.log(data);
   
    
    var newdata = {
      name:this.template_name,
      configuration: data,
      created_by:da["name"],
      gatewaytype:this.gateway_type
  }

  console.log("Datasend:",newdata)
    
    this.backend.addtemplate(newdata)
    .subscribe((data)=> { 
      console.log("Result Data:",data);
      if(data["success"] == true){
        Swal.fire("Template added successfully!");
        this.router.navigate(["/kochar/IOT Gateway/Templates"]);
       }
    });

  }

  temp(x){
    
    if(x == 12){
      this.sensordata = this.sensordata12;
    }else{
      this.sensordata = this.sensordata14;
    }
  }

}
