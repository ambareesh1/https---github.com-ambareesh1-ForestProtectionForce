import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Models/User';
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
  @ViewChild('captchaImage') captchaImage!: CaptchaComponent;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService : AuthenticationService

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
    debugger;
    this.authService.validateCredentials(username, password).subscribe(data => {
     
        
    });
    let user: User = {
      username: 'ambru333',
      name : 'Ambareesh Marimekala',
      email: 'ambru333@gmail.com',
      mobileNo: '9535770068',
      alternativeEmail: 'ambru333@gmail.com',
      address: '123 Main St',
      department: 'Sales',
      roleId: 1,
      roleName: 'Director',
      isActive: true
    };
    
    localStorage.setItem('userDetails', JSON.stringify(user));
    this.router.navigate(['/TwoWayAuthentication']);
  }

}
