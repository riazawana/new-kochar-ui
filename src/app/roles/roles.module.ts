import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { AddroleComponent } from './addrole/addrole.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../keycloak.guard'

import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
 
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const userRoutes: Routes =[
  {path:'',component: RolesComponent , canActivate:[AuthGuard]},
    {path:'Roles',component: RolesComponent , canActivate:[AuthGuard]},
    {path:'addrole',component: AddroleComponent , canActivate:[AuthGuard]},
    {path:'editrole/:id',component: EditRoleComponent , canActivate:[AuthGuard]},
    {path:'viewrole/:id',component: ViewRoleComponent , canActivate:[AuthGuard]},
  ]


@NgModule({
  declarations: [
    RolesComponent,
    AddroleComponent,
    EditRoleComponent,
    ViewRoleComponent    
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // material //

    MatFormFieldModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    KeycloakAngularModule,
    MatSelectModule,
    MomentModule,
    FontAwesomeModule,MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,    
     MatBadgeModule,
     MatSlideToggleModule,
     MatDatepickerModule,
     MatNativeDateModule
  ],
  exports: [RouterModule],

})


export class RolesModule {
  
 }
