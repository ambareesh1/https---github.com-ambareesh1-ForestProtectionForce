import { Injectable } from '@angular/core';
import { UserTypeEnum } from '../enums/UsereTypes';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  otp : number  = 0;
  caseId : any = '';
  userTypeId : number = 0;
  constructor() { 
    this.userTypeId = this.getUserDetails().roleId;
  }

  getUserDetails=()=>{
    const user = window.localStorage.getItem('userDetails')
    return user ? JSON.parse(user) : [];
  }

  isUserCaseEntryOperatorOrDuptyDirector(){
    return (this.userTypeId == UserTypeEnum.CaseEntryOperator || this.userTypeId == UserTypeEnum.DeputyDirector);
  }

  isDuptyDirector(){
    return  this.userTypeId == UserTypeEnum.DeputyDirector;
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
