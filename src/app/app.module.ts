import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductService } from './manage-admin-users/productservice';
import { HttpClientModule } from '@angular/common/http';

import { NgxCaptchaModule } from 'ngx-captcha';
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
    HttpClientModule
  ],
  providers: [ProductService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
