import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Models/User';
import { UserDetailService } from '../services/user-detail.service';
import { Message } from 'primeng/api';
import { Superadmin } from '../Models/Superadmin';
import { SuperadminService } from '../services/superadmin.service';
import { SharedService } from '../services/shared.service';
import { environment } from 'src/environments/environment.development';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  isCapthaNotMatch: boolean = false;
  messages: Message[]=[];
  showPassword : boolean = true;
   isLoading : boolean = false;
  @ViewChild('captchaImage') captchaImage!: CaptchaComponent;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService : AuthServiceService,
    private userDetailsService : UserDetailService,
    private superadminService : SuperadminService,
    private sharedService : SharedService

  ) { 
         if(this.authService.isLoggedIn()){
          this.router.navigate(['/dashboard']);
         }
   }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  public onSubmit = () => {
    if (this.captchaImage.code !== this.loginForm.value.captcha) {
      this.isCapthaNotMatch = true;
      return;
    } else {
      this.isCapthaNotMatch = false;
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;
        this.verfiyCredentials();
    }

  }

  refreshCaptcha() {
    this.captchaImage.generateCaptchaCode();
    this.captchaImage.setupCode();
    this.loginForm.controls['captcha'].setValue("");
  }

  verfiyCredentials = () =>{
    this.isLoading = true;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
  
    if(username.trim() === 'superadmin' || username.trim() === 'superadmin_jammu' || username.trim() === 'superadmin_kashmir'){
     this.superadminService.validateCredentials(username, password).subscribe(data=>{
     this.afterLoginVerified(data,true);
     })
    }else{
      this.userDetailsService.validateCredentials(username, password).subscribe(data => {
        this.afterLoginVerified(data,false);
     });
    }
  }

  afterLoginVerified = (data: any, isSuperAdmin: boolean) => {
    debugger;
    if (data) {
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Valid Credentials, Please wait it will redirect to OTP screen' }];
      if (isSuperAdmin) {
        let superadmin = this.setSuperAdminData(data);
        localStorage.setItem('userDetails', JSON.stringify(superadmin));
        localStorage.setItem('isLoggedIn', 'true');
        if(environment.otpFlag){
          this.router.navigate(['/TwoWayAuthentication']);
        }else{
          this.router.navigate(['/dashboard']);
        }
      } else {
        if (data.isActive == true) {
          let user: User = {
            username: data.username,
            name: data.first_Name + " " + data.last_Name,
            email: data.email,
            mobileNo: data.mobile,
            alternativeEmail: data.alternate_Email,
            address: data.address,
            district: data.districtId,
            province : data.provinceId,
            department: data.userType_Name,
            roleId: data.userType_Id,
            roleName: data.userType_Name,
            isActive: true
          };
          localStorage.setItem('userDetails', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');
          if(environment.otpFlag){
            this.router.navigate(['/TwoWayAuthentication']);
          }else{
            this.router.navigate(['/dashboard']);
          }
         
        }
        else {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Your account is locked. Please contact super admin to unlock.' }];
        }
      }
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid user name or Password . Please provide valid credentails' }];
    }
  }

   setSuperAdminData = (data:any) =>{
    let superadmin: Superadmin = {
      username: data.username,
      email: data.email,
      mobile: data.mobile,
      alternativeemail: data.alternativeemail,
      roleName:  this.sharedService.isSuperAdmin() ? 'superadmin' : this.sharedService.isSuperAdminOfJammu() ? "Super Admin of Jammu" : "Super Admin of Kashmir" ,
      id: 0,
      province: data.province,
      ipaddress: '',
      name: data.username,
      roleId: 0,
      otp: 0,
      password: '',
      lastupdatedOn: new Date()
    };

    return superadmin;
   }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
