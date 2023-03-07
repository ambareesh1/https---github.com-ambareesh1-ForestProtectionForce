import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-two-way-authentication',
  templateUrl: './two-way-authentication.component.html',
  styleUrls: ['./two-way-authentication.component.css']
})
export class TwoWayAuthenticationComponent {

  constructor(private router: Router){}

  public onSubmitOTP = () =>{
          this.router.navigate(["/dashboard"]);
  }
}
