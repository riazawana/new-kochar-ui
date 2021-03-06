import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './keycloak.guard'
import { ErrorComponent } from './error/error.component';
import { Extra1Component } from './extra1/extra1.component';
import { Extra2Component } from './extra2/extra2.component';

const routes: Routes =[{
  path:'',redirectTo: 'kochar/profile', pathMatch: 'full'  , canActivate:[AuthGuard]
}
,{
  path:'kochar',component: WelcomeComponent,children:  [
    // {path:'profile',component: ProfileComponent},
    {path:'extra1',component: Extra1Component},
    {path:'extra2',component: Extra2Component},
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)

    },

    {
      path: 'Users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)

    },

    {
      path: 'Report',
      loadChildren: () => import('./report/report.module').then(m => m.ReportModule)

    },

    {
      path: 'Zones',
      loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule)
    },

    {
      path: 'Features',
      loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
    },


    {
      path: 'Roles',
      loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
    },

    {
      path: 'Notifications',
      loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
    },

    {
      path: 'Escalation Matrix',
      loadChildren: () => import('./escalation-matrix/escalation-matrix.module').then(m => m.EscalationMatrixModule)
    },



    {
      path: 'Health Dashboard',
      loadChildren: () => import('./health-dash/health-dash.module').then(m => m.HealthDashModule)

    },


    {
      path: 'Devices',
      loadChildren: () => import('./device/device.module').then(m => m.DeviceModule)

    },


    {
      path:'IOT Gateway', 
      loadChildren: () => import('./iot-gateway-dash/iot-gateway.module').then(m => m.IotGatewayModule)

    },

    {
      path:"Energy Management",
      loadChildren: () => import('./energy-meter/energy-meter.module').then(m => m.EnergyMeterModule)
    }
   
   ]  , canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: ErrorComponent
  }
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

