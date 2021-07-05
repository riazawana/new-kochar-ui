import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../../backendconnection.service';
import { EditEscalationUserModalComponent } from '../edit-escalation-user-modal/edit-escalation-user-modal.component';  
import {Location} from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatTableDataSource} from '@angular/material/table';


export interface UserData {
  sr_no: string;
  cat: string;
  level:string;
  name:string;
  phone:string;
  email:string;
  desiganation:string;
  tat:string;
  action:string;


}

@Component({
  selector: 'app-escalation-details',
  templateUrl: './escalation-details.component.html',
  styleUrls: ['./escalation-details.component.scss']
})
export class EscalationDetailsComponent implements OnInit {

  displayedColumns: string[] = ['sr_no','cat','level','name','phone','email','desiganation','tat','action'];
  dataSource: MatTableDataSource<UserData>;


 

  constructor( 
    private ngxLoader: NgxUiLoaderService,
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<EscalationDetailsComponent>,
    private dialog: MatDialog,
    private _location:Location,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    alluser:any;
    location_id:any;

  ngOnInit(): void {
    this.ngxLoader.start();
     
    console.log("escalation:",this.data.location_id);
    this.alluser = this.data.data;
    this.location_id = this.data.location_id;

    this.dataSource = new MatTableDataSource(this.data["data"]);


    this.ngxLoader.stop();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(gateway_name,mac_id,client,email){
    var data =  {client:client,
                 location_id: this.location_id,
                 email: email,
                 mac_id: mac_id,
                 gateway_name: gateway_name}


          console.log(data);       
   

          Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Escalation matrix!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {



              // this.backend.(data)
              // .subscribe((data)=> { 
              //     console.log("dara:",data);
              //     if(data["success"]==true){
              //       Swal.fire("Escalation matrix deleted successfully");
              //     //  this._location.back();
              //     this.onNoClick();
              //     }
    
               this.backend.deleteescalationmatrix(data)
        .subscribe((data)=> { 
    
            console.log(data);
            if(data["success"]==true){ 
              this.onNoClick();
              Swal.fire(
                'Deleted!',
                'Escalation matrix deleted successfully.',
                'success'
              )
            }
       
        });         
            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Escalation matrix  is safe :)',
                'error'
              )
            }
          }) 
          
      

        
    // });

 
}


edit(gateway_name,mac_id,client,email,phone,level,designation,tat,name){
  var da = JSON.parse(sessionStorage.getItem('userdata'));

  var data =  { 
    name:name,
    email:email,
     phone: phone,
     level: level,
     designation: designation,
     tat: tat,
     modified_by: da["name"],
     location_id: this.location_id,
     mac_id: mac_id,
     gateway_name: gateway_name,
     client:client
    }

    

      const dialogRef = this.dialog.open(EditEscalationUserModalComponent, {
       //  width: '600px',
        data: {edit_data: data,location_id: this.location_id}    
      },
      );

      dialogRef.afterClosed().subscribe(result => {
       //  console.log('The dialog  two was closed');
      });
    
   }

  //  cancel(){
  //   this._location.back();
  //  }

}
