import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TwoWayAuthenticationComponent } from './two-way-authentication/two-way-authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StandardlayoutComponent } from './standardlayout/standardlayout.component';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { BaselineDataComponent } from './baseline-data/baseline-data.component';
import { ManageAdminUsersComponent } from './manage-admin-users/manage-admin-users.component';

const routes: Routes = [

  {path:'', component:AuthLayoutComponent,
  children:[
    {path:'', component:LoginComponent},
    {path:'forgotpassword', component:ForgotpasswordComponent},
    {path:'TwoWayAuthentication', component:TwoWayAuthenticationComponent},
    {path:'changepassword', component:ChangePasswordComponent},
  ]
},
 {path:'', component:StandardlayoutComponent,
   children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'mangeprofile', component:ManageProfileComponent},
    {path:'baselinedata', component:BaselineDataComponent},
    {path:'manageadminusers', component:ManageAdminUsersComponent}
   ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
