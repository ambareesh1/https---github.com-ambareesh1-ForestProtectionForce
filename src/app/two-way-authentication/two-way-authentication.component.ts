import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
@Component({
  selector: 'app-two-way-authentication',
  templateUrl: './two-way-authentication.component.html',
  styleUrls: ['./two-way-authentication.component.css']
})
export class TwoWayAuthenticationComponent implements OnInit {

  phoneNo : string = "";
  email : string ="";
  otp : number = 0;
  formattedPhoneNo = "";
  formattedEmail = "";
  otpIncorrect = false;
  messages : Message[]=[];

  otpForm !: FormGroup;
  constructor(private router: Router, private sharedService : SharedService, private userDetailsService:UserDetailService, private formBuilder: FormBuilder,){
    let userDetails = this.sharedService.getUserDetails();
    this.otp = this.userDetailsService.otp;
    let phoneNo = userDetails.mobileNo;
    let email = userDetails.email;
    this.formattedPhoneNo = '(+91) ' + phoneNo.substring(0, 0) + '*******' + phoneNo.substring(7);
    this.formattedEmail = email.substring(0,3) + '***@' + email.substring(email.indexOf('@') + 1);
  }
  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required]
    });
  }

  public onSubmitOTP = () =>{
      console.log(this.otpForm.value);
      let enteredOtp = (this.otpForm.value.one + this.otpForm.value.two+this.otpForm.value.three+this.otpForm.value.four)
      
      if(this.otp == Number(enteredOtp)){
        this.router.navigate(["/dashboard"]);
      }else{
        this.otpIncorrect = true;
        return;
      }
          
  }

  resendOtp = () =>{
    debugger;
    let userDetails = this.sharedService.getUserDetails();
    let userName = userDetails.username;
    let otp = Math.floor(1000 + Math.random() * 9000);
    this.otp = otp;
    this.userDetailsService.resendOtp(userName,otp).subscribe(data=>{
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'OTP sent agan. Please verify and try again' }];
    });
  }
}
