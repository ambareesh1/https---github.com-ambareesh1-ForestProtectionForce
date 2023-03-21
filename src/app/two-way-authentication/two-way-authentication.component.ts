import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-two-way-authentication',
  templateUrl: './two-way-authentication.component.html',
  styleUrls: ['./two-way-authentication.component.css']
})
export class TwoWayAuthenticationComponent {

  phoneNo : string = "";
  email : string ="";
  otp : number = 0;
  constructor(private router: Router, private sharedService : SharedService, private authService:AuthenticationService){
    let otpGenarated = Math.floor(1000 + Math.random() * 9000);
    let userDetails = this.sharedService.getUserDetails();
    this.authService.sendOtp(userDetails);
  }

  public onSubmitOTP = () =>{

    if(this)

          this.router.navigate(["/dashboard"]);
  }
}
