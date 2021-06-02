import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from './device.component';
import { EditrouterComponent } from './editrouter/editrouter.component';
import { EditenergyMeterComponent } from './editenergy-meter/editenergy-meter.component';
import { VideogatewayComponent } from './videogateway/videogateway.component';
import { RelaychangeModalComponent } from './relaychange-modal/relaychange-modal.component'
import { LocationComponent } from './location/location.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
// import { AddmoduleComponent } from './addmodule/addmodule.component';
import { ZoneDeviceComponent } from './zone-device/zone-device.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { RouterDetailComponent } from './router-detail/router-detail.component';
import { AddvideogatewayComponent } from './addvideogateway/addvideogateway.component';
import { EditvideogatewayComponent } from './editvideogateway/editvideogateway.component';
import { ViewvideogatewayComponent } from './viewvideogateway/viewvideogateway.component';
import { CameraModalComponent } from './camera-modal/camera-modal.component';
import { PortSettingComponent } from './port-setting/port-setting.component';
import { RoutersComponent } from './routers/routers.component';
import { AddrouterComponent } from './addrouter/addrouter.component';
import { AddnewlocationComponent } from './addnewlocation/addnewlocation.component';


import { RouterAnalysisComponent } from './router-analysis/router-analysis.component';
import { EnergyMeterComponent } from './energy-meter/energy-meter.component';
import { AddenergyMeterComponent } from './addenergy-meter/addenergy-meter.component';
import { ViewenergyComponent } from './viewenergy/viewenergy.component';
import { SecondryGatewayComponent } from './secondry-gateway/secondry-gateway.component';
import { SmartMeterComponent } from './smart-meter/smart-meter.component';



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

import { GetallrecordModalComponent } from './getallrecord-modal/getallrecord-modal.component';

const userRoutes: Routes =[
  {path:'',component: ZoneDeviceComponent , canActivate:[AuthGuard]},
    {path:'Devices',component: ZoneDeviceComponent,canActivate:[AuthGuard]},
    {path:'Router/:idz/:id',component: RoutersComponent,canActivate:[AuthGuard]},
    {path:'addrouter/:id',component: AddrouterComponent,canActivate:[AuthGuard]},
    {path:'Energy/:idz/:id',component: EnergyMeterComponent,canActivate:[AuthGuard]},
    {path:'addenergy/:id',component: AddenergyMeterComponent,canActivate:[AuthGuard]},
    {path:'openrouter/:id',component: RouterDetailComponent,canActivate:[AuthGuard]},
    {path:'analysis/:id/:mac',component: RouterAnalysisComponent,canActivate:[AuthGuard]},
    {path:'Locations/:id/:da',component: LocationComponent,canActivate:[AuthGuard]},
    {path:'port_set/:data',component: PortSettingComponent,canActivate:[AuthGuard]},
    {path:'addgateway/:idz/:id',component: AddlocationComponent,canActivate:[AuthGuard]},
    {path:'addnewlocation/:id',component: AddnewlocationComponent,canActivate:[AuthGuard]},
    {path:'GatewayList/:idz/:id',component: GatewayListComponent,canActivate:[AuthGuard]},
    {path:'singleGatewayList/:mac/:cli',component: GatewayListComponent,canActivate:[AuthGuard]},
    {path:'editrouter/:id',component:EditrouterComponent,canActivate:[AuthGuard]},
    {path:'editenergymeter/:id',component:EditenergyMeterComponent,canActivate:[AuthGuard]},
    {path:'editvideogateway/:id',component:EditvideogatewayComponent,canActivate:[AuthGuard]},
    {path:'devicelist/:idz/:id',component: DeviceComponent,canActivate:[AuthGuard]},
    {path:'addvideogateway/:idz/:id',component:AddvideogatewayComponent,canActivate:[AuthGuard]},
    {path:'Video/:idz/:id',component:VideogatewayComponent,canActivate:[AuthGuard]},
    {path:'viewvideo/:id',component: ViewvideogatewayComponent,canActivate:[AuthGuard]},
    // {path:'addmodule',component: AddmoduleComponent,canActivate:[AuthGuard]},
    {path:'viewenergy/:id',component:ViewenergyComponent,canActivate:[AuthGuard]},
    {path:'Energy Management/Secondary Gateway',component: SecondryGatewayComponent,canActivate:[AuthGuard]},
    {path:'Energy Management/Smartmeter',component: SmartMeterComponent,canActivate:[AuthGuard]},
    {path:'Zones',component: ZoneDeviceComponent,canActivate:[AuthGuard]},
    
  ]


@NgModule({
  declarations: [
    EditrouterComponent,
    DeviceComponent,
    EditenergyMeterComponent,
    VideogatewayComponent,
    AddvideogatewayComponent,
    EditvideogatewayComponent,
    ViewvideogatewayComponent,
    CameraModalComponent,
    PortSettingComponent,
    RoutersComponent,
    AddrouterComponent,
    LocationComponent,
    AddlocationComponent,
    RelaychangeModalComponent,
    // AddmoduleComponent,
    ZoneDeviceComponent,
    GatewayListComponent,
    GetallrecordModalComponent,
    RouterDetailComponent,
    AddnewlocationComponent,
    RouterAnalysisComponent,
    EnergyMeterComponent,
    AddenergyMeterComponent,
    ViewenergyComponent,
    SecondryGatewayComponent,
    SmartMeterComponent, 
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


export class DeviceModule { }
