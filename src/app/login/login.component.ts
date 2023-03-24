import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Models/User';
import { UserDetailService } from '../services/user-detail.service';
import { Message } from 'primeng/api';
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
  @ViewChild('captchaImage') captchaImage!: CaptchaComponent;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService : AuthenticationService,
    private userDetailsService : UserDetailService

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
      this.verfiyCredentials()
    }

  }

  refreshCaptcha() {
    this.captchaImage.generateCaptchaCode();
    this.captchaImage.setupCode();
    this.loginForm.controls['captcha'].setValue("");
  }

  verfiyCredentials = () =>{
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let otp =  Math.floor(1000 + Math.random() * 9000);
    this.userDetailsService.validateCredentials(username, password, otp).subscribe(data => {
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Valid Credentials, Please wait it will redirect to OTP screen' }];
      if(data){
      this.userDetailsService.otp = otp;
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
      this.router.navigate(['/TwoWayAuthentication']);
    }else{
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid user name or Password. Please provide valid credentails' }];
    }
    
    });

  }

}
