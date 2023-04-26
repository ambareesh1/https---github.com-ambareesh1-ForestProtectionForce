import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthenticationService } from '../services/authentication.service';
import { UserDetailService } from '../services/user-detail.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  @ViewChild('captchaImage') captchaImage!: CaptchaComponent;
  isCapthaNotMatch: boolean = false;
  captcha: string = "";
  siteKey = 'your_site_key';
  messages: Message[]=[];
  isLoading : boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService : AuthServiceService,
    private userDetailsService : UserDetailService

  ) {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
     }
   }
  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      username: ['', Validators.required],
      forgotEmail: ['', [Validators.required, Validators.email]],
      captcha: ['', Validators.required]
    });
  }
  
  onForgotSubmit = () =>{
    if (this.captchaImage.code !== this.forgotForm.value.captcha) {
      this.isCapthaNotMatch = true;
      return;
    } else {
      
        let userName = this.forgotForm.value.username;
        let email = this.forgotForm.value.forgotEmail;
        this.userDetailsService.checkUserNameAndEmail(userName, email).subscribe(x=>{
          this.isLoading = true;
          if(x){
            this.isLoading = false;
            let formattedEmail = email.substring(0,3) + '***@' + email.substring(email.indexOf('@') + 1);
            this.messages = [{ severity: 'success', summary: 'Success', detail: 'The password is sent to registered email '+" "+formattedEmail+ ". Please login with new password."  }];
            this.forgotForm.reset();
          }else{
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid user name or email. Please provide valid credentails' }];
          }
        })
      
    }
  }

  refreshCaptcha() {
    this.captchaImage.generateCaptchaCode();
    this.captchaImage.setupCode();
    this.forgotForm.controls['captcha'].setValue("");
  }

}
