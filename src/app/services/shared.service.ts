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
  userDetails : any;
  isSuperAdminOrJammuOrKashmirVar : boolean = false;
  constructor() { 
    this.userTypeId = this.getUserDetails().roleId;
    this.userName = this.getUserDetails().username;
  }

  getUserDetails=()=>{
    const user = window.localStorage.getItem('userDetails')
    this.userDetails =  user ? JSON.parse(user) : [];
    return user ? JSON.parse(user) : [];
  }

  isUserCaseEntryOperatorOrDuptyDirector(){
    return (this.userTypeId == UserTypeEnum.CaseEntryOperator || this.userTypeId == UserTypeEnum.DeputyDirector);
  }

  isDirector() {
    return  this.userTypeId == UserTypeEnum.Director;
  }

  isJointDirector= () =>{
    return this.userTypeId == UserTypeEnum.JointDirector;
  }

  isDuptyDirector(){
    return  this.userTypeId == UserTypeEnum.DeputyDirector;
  }

  isCaseEntryOperator = () =>{
    return this.userTypeId == UserTypeEnum.CaseEntryOperator;
  }

  isSuperAdmin()  {
     return this.userName === 'superadmin';
  }

  isSuperAdminOfJammu() {
    return this.userName === 'superadmin_jammu';
  }

  isSuperAdminOfKashmir(){
    return this.userName === 'superadmin_kashmir';
  }

  isSuperAdminOrJammuOrKashmir = () =>{
    return (this.isSuperAdmin() || this.isSuperAdminOfJammu() || this.isSuperAdminOfKashmir());
  }

  getProvinceForSuperAdminOrNormal =() =>{
    return this.getUserDetails().province;
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

  getDistrictId(){
    return this.userDetails.districtId;
  }

  getUserName (){
    return this.userDetails.username;
  }

  createdUserAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir()  || this.isCaseEntryOperator()
  }

  manageDataAuth = () =>{
     return this.isSuperAdminOrJammuOrKashmir();
  }

  baselineAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir()  || this.isUserCaseEntryOperatorOrDuptyDirector()
  }

  offenderAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator();
  }

  historySheetAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator();
  }

  seizerAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator();
  }

  disposedAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator();
  }

  reportsAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isDuptyDirector() || this.isDirector() || this.isJointDirector() 
  }

}
