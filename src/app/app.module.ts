import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { ProfileComponent } from './profile/profile.component';
import {BackendconnectionService} from "./backendconnection.service";
import {SocketioService} from "./socketio.service";
import {SocketioSendmsgService} from "./socketio-sendmsg.service";
import { CommandSettingComponent } from './command-setting/command-setting.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CommandSettingMeterComponent } from './command-setting-meter/command-setting-meter.component';
import { CommandSettingSmartmeterComponent } from './command-setting-smartmeter/command-setting-smartmeter.component';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ErrorComponent } from './error/error.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Extra1Component } from './extra1/extra1.component';
import { Extra2Component } from './extra2/extra2.component';
// import { UserModule } from './user/user.module';
// import { ZoneModule } from './zone/zone.module';
// import { FeaturesModule } from './features/features.module';
// import { RolesModule } from './roles/roles.module';
// import { NotificationModule } from './notification/notification.module';
// import { EscalationMatrixModule } from './escalation-matrix/escalation-matrix.module';
// import { HealthDashModule } from './health-dash/health-dash.module';
// import { DeviceModule } from './device/device.module';
// import { IotGatewayModule } from './iot-gateway-dash/iot-gateway.module';


import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://202.164.38.204:9002/auth',
        realm: 'TestIOT',
        clientId: 'test-client1',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false

      },
    });
}

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 10
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    // ProfileComponent,
    CommandSettingComponent,
    CommandSettingMeterComponent,
    CommandSettingSmartmeterComponent,
    ErrorComponent,
    Extra1Component,
    Extra2Component, 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    // UserModule,
    // ZoneModule,
    // FeaturesModule,
    // RolesModule,
    // NotificationModule,
    // EscalationMatrixModule,
    // HealthDashModule,
    // DeviceModule,
    // IotGatewayModule,

    ReactiveFormsModule,
    // material //
    MatCheckboxModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    KeycloakAngularModule,
    MatSelectModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    FontAwesomeModule,MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,    
    SimpleNotificationsModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
     MatBadgeModule,
     MatSlideToggleModule,
     MatDatepickerModule,
     MatNativeDateModule
  ],
  providers: [BackendconnectionService,SocketioService,SocketioSendmsgService,
    // {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
    provide: MatDialogRef,
    useValue: {}
    },
    {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  
   },
   {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
   },
  
],
  bootstrap: [AppComponent],
  entryComponents:[
    // EscalationDetailsComponent
  ],

})
export class AppModule { }
