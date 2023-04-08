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
    private authService : AuthenticationService,
    private userDetailsService : UserDetailService,
    private superadminService : SuperadminService,
    private sharedService : SharedService

  ) { }


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
  
    if(username.trim() === 'superadmin'){
     this.superadminService.validateCredentials(username, password).subscribe(data=>{
     this.afterLoginVerified(data,true);
     })
    }else{
      this.userDetailsService.validateCredentials(username, password).subscribe(data => {
        this.afterLoginVerified(data,false);
     });
    }
  }

   afterLoginVerified = (data:any, isSuperAdmin : boolean) =>{
    debugger;
    if(data){
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Valid Credentials, Please wait it will redirect to OTP screen' }];
    if(isSuperAdmin){
      let superadmin: Superadmin = {
        username: data.username,
        email: data.email,
        mobile: data.mobile,
        alternativeemail: data.alternativeemail,
        roleName: 'superadmin',
        id: 0,
        division: '',
        ipaddress: '',
        name: 'superadmin',
        roleId: 0,
        otp:0,
        password:'',
        lastupdatedOn: new Date()
      };
      localStorage.setItem('userDetails', JSON.stringify(superadmin));
    }else{
      let user: User = {
        username: data.username,
        name : data.first_Name+" "+data.last_Name,
        email: data.email,
        mobileNo: data.mobile,
        alternativeEmail: data.alternate_Email,
        address: data.address,
        department: data.userType_Name,
        roleId: data.userType_Id,
        roleName: data.userType_Name,
        isActive: true
      };
      localStorage.setItem('userDetails', JSON.stringify(user));
    }
   
 
    localStorage.setItem('isLoggedIn','true');
    this.router.navigate(['/TwoWayAuthentication']);
  }else{
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid user name or Password. Please provide valid credentails' }];
  }
   }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
