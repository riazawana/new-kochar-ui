import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IotGatewayDashComponent } from './iot-gateway-dash.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';

import { GatwaysStatusComponent } from './gatways-status/gatways-status.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { SmsManagerComponent } from './sms-manager/sms-manager.component';
import { AddSmsManagerComponent } from './add-sms-manager/add-sms-manager.component';

import { ViewTemplateComponent } from './view-template/view-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { ViewSchduleManagerComponent } from './view-schdule-manager/view-schdule-manager.component';
import { SchduleManagerComponent } from './schdule-manager/schdule-manager.component';


import { ViewSmsManagerComponent } from './view-sms-manager/view-sms-manager.component';
import { EditSmsManagerComponent } from './edit-sms-manager/edit-sms-manager.component';


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
    // {path:'',component: IotGatewayDashComponent , canActivate:[AuthGuard]},
    {path:'viewschedule/:id/:cli',component: ViewSchduleManagerComponent,canActivate:[AuthGuard]},
    {path:'editschedule/:id/:cli',component: ViewSchduleManagerComponent,canActivate:[AuthGuard]},
    {path:'Templates',component: TemplateListComponent,canActivate:[AuthGuard]},
      {path:'List all Gateway',component: GatewaysComponent,canActivate:[AuthGuard]},
      {path:'SMS Manager',component: SmsManagerComponent,canActivate:[AuthGuard]},
      {path:'Notification Manager',component: NotificationManagerComponent,canActivate:[AuthGuard]},
      {path:'Schedule Manager',component: SchduleManagerComponent,canActivate:[AuthGuard]},
     {path:'addtemplate',component: AddtemplateComponent,canActivate:[AuthGuard]},
     {path:'addsmssetting',component: AddSmsManagerComponent,canActivate:[AuthGuard]},
    {path:'edittemplate/:id',component:EditTemplateComponent,canActivate:[AuthGuard]},
    {path:'viewtemplate/:id',component:ViewTemplateComponent,canActivate:[AuthGuard]},
    {path:'editsmsmanger/:id',component:EditSmsManagerComponent,canActivate:[AuthGuard]},
    {path:'viewsmssetting/:id',component:ViewSmsManagerComponent,canActivate:[AuthGuard]},
   
  ]


@NgModule({
  declarations: [
    TemplateListComponent,
    GatewaysComponent,
    AddtemplateComponent,
    GatwaysStatusComponent,
    NotificationManagerComponent,
    SmsManagerComponent,
    AddSmsManagerComponent,
    ViewTemplateComponent,
    EditTemplateComponent,
    ViewSchduleManagerComponent,
    SchduleManagerComponent,
    ViewSmsManagerComponent,
    EditSmsManagerComponent, 
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


export class IotGatewayModule { }
