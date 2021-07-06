import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendconnectionService } from '../backendconnection.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface UserData {
  sr_no: string;
  name: string;
  role: string;
  zone: string;
  // email: string;
  action:any;
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr_no', 'name', 'role','zone', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private backend: BackendconnectionService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  business = false;

  edit:boolean = false;
  delete:boolean = false;
  view:boolean = false;
  add:boolean = false;

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
      if(features[i].feature_name == 'Users'){
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
  
  
   


   this.getuser();
    

   
  }

  getuser(){
    this.backend.getallusers()
    .subscribe((data)=> { 
    this.ngxLoader.stop();
       
        //console.log("All Users:",data);
       var users = data["data"];
       var business_user = [];
       
       for(var k = 0; k<users.length; k++){
        if(users[k].roles[0].name == "business"){
          business_user.push(users[k])
        }
       }

       if(this.route.snapshot.routeConfig.path == "Business"){
        setTimeout(() => {
          this.business = true;
        }, 1);
  
        this.dataSource = new MatTableDataSource(business_user);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
      }else{
        this.business = false;
  
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      
         

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adduser(){
    this.router.navigate(['/kochar/Users/adduser']);
  }

  viewUser(id){
    this.router.navigate(['/kochar/Users/viewuser',id])
  }
  editUser(id){
    this.router.navigate(['/kochar/Users/edituser',id])
  }

  // deleteUser(x){
  //   // alert(x)
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //   this.backend.deleteuser(x)
  //   .subscribe((data)=> { 

  //     //  console.log("delete Users:",data);
  //      this.getuser();  
  //   });
  // }
  // }

  deleteUser(x){
    //  alert(x)
    // if (confirm('Are you sure to delete this record ?') == true) {
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this User!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

           this.backend.deleteuser(x)
    .subscribe((data)=> { 

        //console.log(data);
      this.getuser();
      Swal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      )
    });         
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'User is safe :)',
            'error'
          )
        }
      }) 
   
  // }
  }

}

