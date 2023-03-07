import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TwoWayAuthenticationComponent } from './two-way-authentication/two-way-authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
const routes: Routes = [
 {path:'', component:LoginComponent},
 {path:'forgotpassword', component:ForgotpasswordComponent},
 {path:'TwoWayAuthentication', component:TwoWayAuthenticationComponent},
 {path:'dashboard', component:DashboardComponent},
 {path:'changepassword', component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
