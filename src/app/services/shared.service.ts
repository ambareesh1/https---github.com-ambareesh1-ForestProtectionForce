import { Injectable } from '@angular/core';
import { UserTypeEnum } from '../enums/UsereTypes';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  otp : number  = 0;
  caseId : any = '';
  userTypeId : number = 0;
  userName : string = '';
  constructor() { 
    this.userTypeId = this.getUserDetails().roleId;
    this.userName = this.getUserDetails().username;
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

  isSuperAdmin(){
     return this.userName === 'superadmin';
  }

  isSuperAdminOfJammu() {
    return this.userName === 'superadmin_jammu';
  }

  isSuperAdminOfKashmir(){
    return this.userName === 'superadmin_kashmir';
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
