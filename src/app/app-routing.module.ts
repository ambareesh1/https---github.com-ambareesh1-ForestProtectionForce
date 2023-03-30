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
import { HistoryComponent } from './history/history.component';
import { DisposedComponent } from './disposed/disposed.component';
import { SeizureComponent } from './seizure/seizure.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AuthGuard } from './auth.guard';

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
    {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
    {path:'mangeprofile', component:ManageProfileComponent, canActivate: [AuthGuard]},
    {path:'createadmin', component:CreateAdminComponent,canActivate: [AuthGuard]},
    {path:'baselinedata', component:BaselineDataComponent,canActivate: [AuthGuard]},
    {path:'baselinedata/:id', component:BaselineDataComponent,canActivate: [AuthGuard]},
    {path:'baselinegrid', component:BaselineGridComponent,canActivate: [AuthGuard]},
    {path:'manageadminusers', component:ManageAdminUsersComponent,canActivate: [AuthGuard]},
    {path:'manageprovision', component:ManageProvinceComponent,canActivate: [AuthGuard]},
    {path:'managecircle', component:ManageCircleComponent,canActivate: [AuthGuard]},
    {path:'managedistrict', component:ManageDistrictComponent,canActivate: [AuthGuard]},
    {path:'manangedivision', component:ManageDivisionComponent,canActivate: [AuthGuard]},
    {path:'managecompartment', component:ManageCompartmentComponent,canActivate: [AuthGuard]},
    {path:'manageparent', component:ManageParentComponent,canActivate: [AuthGuard]},
    {path: 'offenderprofile', component:OffenderProfileComponent,canActivate: [AuthGuard]},
    {path:'offenderprofileData', component:OffenderProfileDataComponent,canActivate: [AuthGuard]},
    {path:'history', component:HistoryComponent,canActivate: [AuthGuard]},
    {path:'disposed', component:DisposedComponent,canActivate: [AuthGuard]},
    {path:'seizure', component:SeizureComponent,canActivate: [AuthGuard]},
    {path:'reports', component:ReportsComponent,canActivate: [AuthGuard]}
   ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
