import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { AddzoneComponent } from './addzone/addzone.component';
import { EditZoneComponent } from './edit-zone/edit-zone.component';
import { ViewZoneComponent } from './view-zone/view-zone.component';
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
// import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// import { SimpleNotificationsModule } from 'angular2-notifications';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const zoneRoutes: Routes =[
  {path:'',component: ZoneComponent , canActivate:[AuthGuard]},
    {path:'Zones',component: ZoneComponent , canActivate:[AuthGuard]},
    {path:'addzone',component: AddzoneComponent , canActivate:[AuthGuard]},
    {path:'editzone/:id',component: EditZoneComponent , canActivate:[AuthGuard]},
    {path:'viewzone/:id',component: ViewZoneComponent , canActivate:[AuthGuard]},
  ]


@NgModule({
  declarations: [
    ZoneComponent,
    AddzoneComponent,
    ViewZoneComponent,
    EditZoneComponent,
    
  ],
  imports: [
    RouterModule.forChild(zoneRoutes),
    CommonModule,
    HttpClientModule,
  
    FormsModule,
    ReactiveFormsModule,
    // material //
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
     MatNativeDateModule,MatFormFieldModule,
  ],
  exports: [RouterModule],

})
export class ZoneModule {
 
 }








