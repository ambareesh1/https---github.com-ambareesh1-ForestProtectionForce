import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnInit {
  
  private isLoggedInUser = false;
  private loggedIn = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }
  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
  }

  // get isLoggedIn$() {
  //   return this.isLoggedInUser;
  // }

  login() {
    // TODO: Replace with actual login logic
    this.loggedIn = true;
    this.isLoggedInUser = true;
    this.isLoggedInSubject.next(true)
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    // TODO: Replace with actual logout logic
    this.isLoggedInUser = false;
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn; 
  }
}
