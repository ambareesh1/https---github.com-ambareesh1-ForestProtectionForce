import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = false;

  constructor() {
    debugger;
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login() {
    // TODO: Replace with actual login logic
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    // TODO: Replace with actual logout logic
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn; 
  }
}
