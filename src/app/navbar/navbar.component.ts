import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
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

  constructor(private authService: AuthServiceService, private sharedService:SharedService, private router : Router) { }

  ngOnInit() {
        if (this.authService.isLoggedIn()) {
          this.isLoggedIn = true;
          let details = this.sharedService.getUserDetails()
          this.userName = details.name;
        } else {
          this.userName = '';
        }
  }

  logout() {
    localStorage.clear();
    this.userName = '';
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
