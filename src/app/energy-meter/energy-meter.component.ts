import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendconnectionService } from '../backendconnection.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export interface UserData {
  sr_no: string;
  name: string;
  type: string;
  action:string;
}

@Component({
  selector: 'app-energy-meter',
  templateUrl: './energy-meter.component.html',
  styleUrls: ['./energy-meter.component.scss']
})
export class EnergyMeterComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr_no', 'name', 'type','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private backend: BackendconnectionService,
    private router: Router
  ) {
  }

  edit:boolean = false;
  delete:boolean = false;
  view:boolean = false;
  add:boolean = false;

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
          if(features[i].feature_name == 'Features'){
             if(features[i].add == true){
            this.add = true;
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

   this.getallf();

   
  }

  getallf(){
    this.backend.getallfeatures()
    .subscribe((data)=> { 
        console.log("All roles:",data['data']);
       this.dataSource = new MatTableDataSource(data['data']);
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


  addfeatures(){
    this.router.navigate(['/kochar/Features/addfeatures']);
  }

  viewfeatures(x){
    this.router.navigate(['/kochar/Features/viewfeatures',x]);
  }


  // deletefeature(x,y){
  //   // alert(x)
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.backend.deletefeature(x,y)
  //     .subscribe((data)=> { 
  //         console.log("data",data);
  //    this.getallf();
  
  //     });
  // }
  // }

  deletefeature(x,y){
    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Feature!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

           this.backend.deletefeature(x,y)
    .subscribe((data)=> { 

      //  console.log(data);
      this.getallf();
      Swal.fire(
        'Deleted!',
        'Feature has been deleted.',
        'success'
      )
    });         
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Feature is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }

  

  
}

