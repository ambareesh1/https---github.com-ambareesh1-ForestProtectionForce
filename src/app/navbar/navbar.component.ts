import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthenticationService, private sharedService:SharedService, private router : Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(
      (isLoggedIn: boolean) => {
        debugger;
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          let details = this.sharedService.getUserDetails()
          console.log(details)
          this.userName = details.name;
        } else {
          this.userName = '';
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.userName = '';
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
