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
    return (this.getUserTypeFromLocalStorage() == UserTypeEnum.CaseEntryOperator || this.getUserTypeFromLocalStorage == UserTypeEnum.DeputyDirector);
  }

  isDirector() {
    return  this.getUserTypeFromLocalStorage() == UserTypeEnum.Director;
  }

  isJointDirector= () =>{
    return this.getUserTypeFromLocalStorage() == UserTypeEnum.JointDirector;
  }

  isDuptyDirector(){
    return  this.getUserTypeFromLocalStorage() == UserTypeEnum.DeputyDirector;
  }

  isCaseEntryOperator = () =>{
    return this.getUserTypeFromLocalStorage() == UserTypeEnum.CaseEntryOperator;
  }

  isSuperAdmin()  {
     return this.getUserNameFromLocalStorage() === 'superadmin';
  }

  isSuperAdminOfJammu() {
    return this.getUserNameFromLocalStorage() === 'superadmin_jammu';
  }

  isSuperAdminOfKashmir(){
    return this.getUserNameFromLocalStorage() === 'superadmin_kashmir';
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
    return this.isSuperAdminOrJammuOrKashmir() ?  this.userDetails.districtId??0 : this.userDetails.district;
  }

  getCircleId(){
    return this.isSuperAdminOrJammuOrKashmir() ?  this.userDetails.districtId??0 : this.userDetails.circle;
  }

  getUserName (){
    return this.userDetails.username;
  }

  createdUserAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir();
  }

  manageDataAuth = () =>{
     return this.isSuperAdminOrJammuOrKashmir();
  }

  baselineAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir()  || this.isCaseEntryOperator() || this.isDuptyDirector()
  }

  offenderAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator() || this.isDuptyDirector();
  }

  historySheetAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator() || this.isDuptyDirector();
  }

  seizerAuth = () =>{
    return  this.isCaseEntryOperator() || this.isDuptyDirector();
  }

  disposedAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isCaseEntryOperator() || this.isDuptyDirector();
  }

  reportsAuth = () =>{
    return this.isSuperAdminOrJammuOrKashmir() || this.isDuptyDirector() || this.isDirector() || this.isJointDirector() || this.isCaseEntryOperator();
  }

  getUserNameFromLocalStorage : any = () =>{
    return  this.getUserDetails().username;
  }

  getUserTypeFromLocalStorage :any = () =>{
   return  this.getUserDetails().roleId;
  }

}
