import { Component, OnInit } from '@angular/core';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  constructor(
    private backend:BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  template_name:any;

  view:boolean = true;


  id:string;
  template:any;
  port_number:any;
  sensor_name:any;
  room_name:any;
  default_state:any;
  alarm_type:any;
  tem_data:any;

  ngOnInit(): void {



    this.ngxLoader.start();
   

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      })
        this.backend.getTemplate(this.id)
    .subscribe((data)=> { 
    this.ngxLoader.stop();
        this.tem_data = data["data"][0];
        console.log(this.tem_data);

      this.template = data["data"][0].configuration; 
      this.template_name = data["data"][0].name; 

    });
  }

  update(){
    var da = {
      "_id":  this.tem_data._id,
      "configuration": this.template,
      "status": this.tem_data.status,
      "name": this.template_name
    }

   console.log(da);
    this.backend.updatetemplate(da)
    .subscribe((data)=> { 
        console.log(data);
        if(data["success"] == true){
          Swal.fire("Template update successfully!");
          this.router.navigate(["/kochar/IOT Gateway/Templates"]);
         }
    });
  }
            cancel(){
              this.router.navigate(["/kochar/IOT Gateway/Templates"]);
            }
}
