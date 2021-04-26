import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscalationMatrixComponent } from './escalation-matrix.component';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';
import { AddNewUserEsclationComponent } from './add-new-user-esclation/add-new-user-esclation.component';
import { AddUserEsclationComponent } from './add-user-esclation/add-user-esclation.component';
import { EditEscalationUserModalComponent } from './edit-escalation-user-modal/edit-escalation-user-modal.component';


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

const escRoutes: Routes =[
  {path:'',component: EscalationMatrixComponent , canActivate:[AuthGuard]},
    {path:'Escalation Matrix',component: EscalationMatrixComponent, canActivate:[AuthGuard]},
    {path:'adduserescalation/:id',component:AddUserEsclationComponent, canActivate:[AuthGuard]},
    {path:'addnewuserescalation',component:AddNewUserEsclationComponent, canActivate:[AuthGuard]},
  ]


@NgModule({
  declarations: [
    EscalationDetailsComponent,
    EscalationMatrixComponent,
    AddNewUserEsclationComponent,
    AddUserEsclationComponent    ,
    EditEscalationUserModalComponent
  ],
  imports: [
    RouterModule.forChild(escRoutes),
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

export class EscalationMatrixModule { }
