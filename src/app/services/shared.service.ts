import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  otp : number  = 0;
  constructor() { }

  getUserDetails=()=>{
    const user = window.localStorage.getItem('userDetails')
    return user ? JSON.parse(user) : [];
  }

  setOtp(otp: number) {
    this.otp = otp;
  }

  getOtp() {
    return this.otp;
  }
}
