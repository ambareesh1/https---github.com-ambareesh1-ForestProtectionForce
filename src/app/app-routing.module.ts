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
import { ManageProvinceComponent } from './manage-province/manage-province.component';
import { ManageCircleComponent } from './manage-circle/manage-circle.component';
import { ManageDistrictComponent } from './manage-district/manage-district.component';
import { ManageDivisionComponent } from './manage-division/manage-division.component';
import { ManageCompartmentComponent } from './manage-compartment/manage-compartment.component';
import { ManageParentComponent } from './manage-parent/manage-parent.component';
import { OffenderProfileComponent } from './offender-profile/offender-profile.component';
import { OffenderProfileDataComponent } from './offender-profile-data/offender-profile-data.component';
import { BaselineGridComponent } from './baseline-grid/baseline-grid.component';

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
    {path:'baselinegrid', component:BaselineGridComponent},
    {path:'manageadminusers', component:ManageAdminUsersComponent},
    {path:'manageprovision', component:ManageProvinceComponent},
    {path:'managecircle', component:ManageCircleComponent},
    {path:'managedistrict', component:ManageDistrictComponent},
    {path:'manangedivision', component:ManageDivisionComponent},
    {path:'managecompartment', component:ManageCompartmentComponent},
    {path:'manageparent', component:ManageParentComponent},
    {path: 'offenderprofile', component:OffenderProfileComponent},
    {path:'offenderprofileData', component:OffenderProfileDataComponent}
   ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
