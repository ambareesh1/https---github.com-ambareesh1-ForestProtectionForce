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
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
