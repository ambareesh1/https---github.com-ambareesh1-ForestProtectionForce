import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
// -----------------------  Imports - PrimeNg ---------------
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import {ChartModule} from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {	ToggleButtonModule} from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {InputMaskModule} from 'primeng/inputmask';
import {ChipsModule} from 'primeng/chips';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// -----------------------  Imports - Primng API ---------------
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';


// -----------------------  Imports - Componenets ---------------
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TwoWayAuthenticationComponent } from './two-way-authentication/two-way-authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { StandardlayoutComponent } from './standardlayout/standardlayout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { BaselineDataComponent } from './baseline-data/baseline-data.component';
import { ManageAdminUsersComponent } from './manage-admin-users/manage-admin-users.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


// ------------------------  Services ---------------------
import { ProductService } from './manage-admin-users/productservice';
import { ManageProvinceComponent } from './manage-province/manage-province.component';
import { ManageCircleComponent } from './manage-circle/manage-circle.component';
import { ManageDistrictComponent } from './manage-district/manage-district.component';
import { ManageDivisionComponent } from './manage-division/manage-division.component';
import { ManageCompartmentComponent } from './manage-compartment/manage-compartment.component';
import { ManageParentComponent } from './manage-parent/manage-parent.component';
import { OffenderProfileComponent } from './offender-profile/offender-profile.component';
import { OffenderProfileDataComponent } from './offender-profile-data/offender-profile-data.component';
import { BaselineGridComponent } from './baseline-grid/baseline-grid.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';
import { DisposedComponent } from './disposed/disposed.component';
import { SeizureComponent } from './seizure/seizure.component';
import { ReportsComponent } from './reports/reports.component';
import { BaselineViewComponent } from './baseline-view/baseline-view.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ManageUserTypesComponent } from './manage-user-types/manage-user-types.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    TwoWayAuthenticationComponent,
    DashboardComponent,
    ChangePasswordComponent,
    CaptchaComponent,
    StandardlayoutComponent,
    AuthLayoutComponent,
    ManageProfileComponent,
    BaselineDataComponent,
    ManageAdminUsersComponent,
    ManageProvinceComponent,
    ManageCircleComponent,
    ManageDistrictComponent,
    ManageDivisionComponent,
    ManageCompartmentComponent,
    ManageParentComponent,
    OffenderProfileComponent,
    OffenderProfileDataComponent,
    BaselineGridComponent,
    NavbarComponent,
    HistoryComponent,
    DisposedComponent,
    SeizureComponent,
    ReportsComponent,
    BaselineViewComponent,
    CreateAdminComponent,
    ManageUserTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    NgxCaptchaModule,
    RippleModule,
    ChartModule,
    MenubarModule,
    TableModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    HttpClientModule,
    ToggleButtonModule,
    AccordionModule,
    FieldsetModule,
    PanelModule,
    InputMaskModule,
    ChipsModule,
    ProgressSpinnerModule,
    DynamicDialogModule
  ],
  providers: [ProductService, MessageService, ConfirmationService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
