import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
import { SuperadminService } from '../services/superadmin.service';
import { AuthServiceService } from '../services/auth-service.service';

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
  constructor(private router: Router, private sharedService : SharedService, private userDetailsService:UserDetailService,
     private formBuilder: FormBuilder, private superadminServices : SuperadminService, private authService : AuthServiceService){
  let username = this.sharedService.getUserDetails().username;
  let a = this.sharedService.isSuperAdminOrJammuOrKashmir();
  console.log(a);
  if(this.sharedService.isSuperAdminOrJammuOrKashmir()){
    this.superadminServices.getSuperadminByUserName(username).subscribe(x=>{
      this.otp = Number(x.otp);
    });
  }else{
    this.userDetailsService.getUserDetailsByUserName(username).subscribe(x=>{
      this.otp = Number(x.otp);
    });
  }

  }
  ngOnInit(): void {
    debugger;
    this.otpForm = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required]
    });
    let userDetails = this.sharedService.getUserDetails();
    let phoneNo = userDetails.mobileNo?? userDetails.mobile;
    let email = userDetails.email?? userDetails.email;
    this.formattedPhoneNo = '(+91) ' + phoneNo.substring(0, 0) + '*******' + phoneNo.substring(7);
    this.formattedEmail = email.substring(0,3) + '***@' + email.substring(email.indexOf('@') + 1);
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'OTP sent to registered email. Please verify.' }];
  }

  public onSubmitOTP = () =>{
      debugger;
      let enteredOtp = (this.otpForm.value.one + this.otpForm.value.two+this.otpForm.value.three+this.otpForm.value.four)
      
      if(this.otp == Number(enteredOtp)){
        this.authService.login();
        this.router.navigate(["/dashboard"]);
       
      }else{
        this.otpIncorrect = true;
      }
          
  }

  resendOtp = () =>{
  
    let userDetails = this.sharedService.getUserDetails();
    let userName = userDetails.username;

    this.userDetailsService.resendOtp(userName).subscribe(data=>{
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'OTP sent again. Please verify and try again' }];
    });
  }
}
                          