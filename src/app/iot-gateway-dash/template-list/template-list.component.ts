import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendconnectionService } from '../../backendconnection.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface UserData {
  sr_no: string;
  name: string;
  created_by: string;
  action:any;
}

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})



export class TemplateListComponent implements AfterViewInit {

  id:string;
  

  displayedColumns: string[] = ['sr_no', 'name', 'created_by', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  add:any=false;
  delete:any=false;
  view:any=false;
  edit:any=false;


  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.ngxLoader.start();

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
          if(features[i].feature_name == 'Templates'){
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
       this.getAllTemplateList();   

   
  }
     
      getAllTemplateList(){
        this.backend.getalltemplate()
    .subscribe((data)=> { 

    this.ngxLoader.stop();

      //  console.log("All Template:",data["data"]);
       this.dataSource = new MatTableDataSource(data["data"]);

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

  addtemplate(){
    this.router.navigate(['/kochar/IOT Gateway/addtemplate']);
  }

  openView(id): void {
    this.router.navigate(['/kochar/IOT Gateway/viewtemplate',id])   
  }

  openEdit(id): void {
    this.router.navigate(['/kochar/IOT Gateway/edittemplate',id])
  }
  
  openDelete(x){   
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Template-List!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

           this.backend.deletetemplate(x)
    .subscribe((data)=> { 

      //  console.log(data);
      this.getAllTemplateList();
      Swal.fire(
        'Deleted!',
        'Template-List has been deleted.',
        'success'
      )
    });         
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Template-List is safe :)',
            'error'
          )
        }
      })   
  
  }
}

