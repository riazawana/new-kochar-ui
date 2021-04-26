import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './keycloak.guard'
import { ErrorComponent } from './error/error.component';
const routes: Routes =[{
  path:'',redirectTo: 'kochar/profile', pathMatch: 'full'  , canActivate:[AuthGuard]
}
,{
  path:'kochar',component: WelcomeComponent,children:  [
    {path:'profile',component: ProfileComponent},

    {
      path: 'Users',
      loadChildren: './user/user.module#UserModule'
    },

    {
      path: 'Zones',
      loadChildren: './zone/zone.module#ZoneModule'
    },

    {
      path: 'Features',
      loadChildren: './features/features.module#FeaturesModule'
    },


    {
      path: 'Roles',
      loadChildren: './roles/roles.module#RolesModule'
    },

    {
      path: 'Notifications',
      loadChildren: './notification/notification.module#NotificationModule'
    },

    {
      path: 'Escalation Matrix',
      loadChildren: './escalation-matrix/escalation-matrix.module#EscalationMatrixModule'
    },



    {
      path: 'Health Dashboard',
      loadChildren: './health-dash/health-dash.module#HealthDashModule'
    },


    {
      path: 'Devices',
      loadChildren: './device/device.module#DeviceModule'
    },


    {
      path:'IOT Gateway', 
      loadChildren: './iot-gateway-dash/iot-gateway.module#IotGatewayModule'
    },
   ]  , canActivate:[AuthGuard]
  },
  // {
  //   path: '**',
  //   component: ErrorComponent
  // }
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

