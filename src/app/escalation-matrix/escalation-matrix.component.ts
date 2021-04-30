import {AfterViewInit, Component, ViewChild,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendconnectionService } from '../backendconnection.service';

import {Router} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';                    // modal two load

export interface DialogData {
  select_s_e : string;
}


export interface UserData {
  sr_no: string;
  hub_name: string;
  location: string;
  action:any;
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrls: ['./escalation-matrix.component.scss']
})

export class EscalationMatrixComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr_no', 'hub_name', 'location', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private backend: BackendconnectionService,
    private router: Router,   private dialog: MatDialog,
    public dialogRef: MatDialogRef<EscalationMatrixComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  id: string; 

  onNoClick(): void {
    this.dialogRef.close();
  }


  /////////////////////////modal 2/////////////////////////////////////
     openDialog(data,location_id): void {
     

       const dialogRef = this.dialog.open(EscalationDetailsComponent, {
        //  width: '600px',
         data: {data: data,location_id:location_id}    
       },
       );

       dialogRef.afterClosed().subscribe(result => {
        //  console.log('The dialog  two was closed');
       });
     }

  

     edit:boolean = false;
     delete:boolean = false;
     view:boolean = false;
     add:boolean = false;
     addsinglebtn:boolean=false;
   
     ngAfterViewInit() {
   
   
     
    var role = sessionStorage.getItem('role');

    if(role == 'admin'){
      setTimeout(() => {
         this.add = true;
      this.edit = true;
      this.delete = true;
      this.view = true;
      });
    }else{
    
      setTimeout(() => {
        var features = JSON.parse(sessionStorage.getItem('features'));
        for(var i = 0; i < features.length; i++){
          if(features[i].feature_name == 'Escalation Matrix'){
             if(features[i].add == true){
            // alert('aa')

            this.add = true;
            this.addsinglebtn = true;
             }
             if(features[i].view == true){
              this.view = true;
               }
               if(features[i].edit == true){
                this.edit = true;
                 }if(features[i].delete == true){
                  this.delete = true;
                   }
    
          } 
        }
        
       }, 1);
    }
      var newdata = []

    this.backend.getescalationmatrixuserwise()
    .subscribe((data)=> { 
        console.log("All escalation:",data);

     
      newdata = data["data"];

       this.dataSource = new MatTableDataSource(newdata);


       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;

    });

   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // edituser(id){
  //  // alert(id)
  //   //this.router.navigate(['/kochar/adduserescalation',id]);
  // }

  addsingle(id,c){
  

    var k = id.location_name;
    var n = id.location_id;

  

    this.router.navigate(['/kochar/Escalation Matrix/addsingleuseresclation',n,k,c]);


  }

  addnewuser(){
    this.router.navigate(['/kochar/Escalation Matrix/addnewuserescalation']);
  }

 
  

  
}

