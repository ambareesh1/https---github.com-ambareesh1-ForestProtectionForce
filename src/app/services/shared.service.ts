import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  otp : number  = 0;
  caseId : any = '';
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

  setCaseId(caseId: any){
    this.caseId = caseId;
  }

  getCaseId() {
    return this.caseId;
  }
}
