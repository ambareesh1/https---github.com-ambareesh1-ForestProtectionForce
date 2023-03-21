import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
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

  otpForm !: FormGroup;
  constructor(private router: Router, private sharedService : SharedService, private authService:AuthenticationService, private formBuilder: FormBuilder,){
    let otpGenarated = Math.floor(1000 + Math.random() * 9000);
    let userDetails = this.sharedService.getUserDetails();
    this.otp = 3333;
    this.authService.sendOtp(userDetails);
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
    let userDetails = this.sharedService.getUserDetails();
    this.authService.sendOtp(userDetails);
    this.otp = 4444;
  }
}
