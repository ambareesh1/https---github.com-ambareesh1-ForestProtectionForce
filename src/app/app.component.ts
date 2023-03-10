import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forest Protection Force';
  currentUrl: string;
  isLandingPage : boolean = false; 
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

   isLandingPageBackground = ()=>{
    console.log(this.currentUrl);
    if(this.currentUrl === "/" || this.currentUrl == "forgotpassword"){
      this.isLandingPage = true;
    }
   }

}
