import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../../backendconnection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-edit-escalation-user-modal',
  templateUrl: './edit-escalation-user-modal.component.html',
  styleUrls: ['./edit-escalation-user-modal.component.scss']
})
export class EditEscalationUserModalComponent implements OnInit {

  constructor( 
    private ngxLoader: NgxUiLoaderService,
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<EditEscalationUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    location_id:any;
    edit_data:any;
    email:any;
 phone:any;
 level:any ;
 designation:any;
 tat:any;
 name:any;
  ngOnInit(): void {
    this.ngxLoader.start();
     
   this.location_id = this.data.location_id;
   this.edit_data = this.data.edit_data;

    // alert(this.location_id);
    //console.log(this.edit_data);

   this.email = this.edit_data.email;
   this.phone = this.edit_data.phone;
   this.level = this.edit_data.level;
   this.designation = this.edit_data.designation;
   this.tat = this.edit_data.tat;
   this.name = this.edit_data.name;

   this.ngxLoader.stop();


  }

 
  level_list = [1,2,3,4,5,6,7,8,9,10];

 



edit(){
  var data =  { 
    name: this.name,
    email:this.email,
     phone: this.phone,
     level: parseInt(this.level,10) ,
     designation:this.designation,
     tat: this.tat,
     modified_by:this.edit_data.modified_by,
     location_id: this.edit_data.location_id,
     mac_id: this.edit_data.mac_id,
     gateway_name: this.edit_data.gateway_name,
     client:this.edit_data.client
    }

    //console.log(data);

    this.backend.updateescalationmatrix(data)
    .subscribe((data)=> { 
        //console.log("dara:",data);
        if(data["success"]==true){
          Swal.fire("Escalation matrix updated successfully!");
          this.onNoClick();
        }else{
          Swal.fire(data["msg"]);
         }
    });
   }

   onNoClick(): void {
    this.dialogRef.close();
  }

}

