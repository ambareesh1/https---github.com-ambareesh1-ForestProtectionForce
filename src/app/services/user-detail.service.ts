import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserDetails } from '../Models/UserDetails';
import { UserTypes } from '../Models/UserTypes';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private baseUrl : string = environment.apiBaseUrl;
  public otp : number =0; 
  constructor(private http: HttpClient) {

   }

  getUserDetails(){
    return  this.http.get<UserDetails[]>(this.baseUrl+'/UserDetails');
  }

  getUserTypes(){
    return  this.http.get<UserTypes[]>(this.baseUrl+'/UserDetails/userTypes');
  }

  getUserDetailsByid = (id:any) =>{
    return  this.http.get<UserDetails[]>(this.baseUrl+'/UserDetails/'+id);
  }

  getUserDetailsByUserName = (username:any) =>{
    return  this.http.get<UserDetails>(this.baseUrl+'/UserDetails/GetUserDetailsByUserName'+username);
  }

  createUserDetails(circle: UserDetails): Observable<UserDetails> {

    return this.http.post<UserDetails>(this.baseUrl+'/UserDetails', circle);
  }

  editUserDetails(UserDetails: UserDetails, id: any): Observable<UserDetails> {
    return this.http.put<UserDetails>(this.baseUrl + '/UserDetails/'+ id, UserDetails);
  }

  lockOrUnLockUserDetails(UserDetails: UserDetails, id: any): Observable<UserDetails> {
    return this.http.put<UserDetails>(this.baseUrl + '/UserDetails/lockorunlock' + id, UserDetails);
  }
  

  deleteUserDetails(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/UserDetails/'+id+'');
  }

  validateCredentials = (username: any, password: any): Observable<UserDetails> => {
    const body = { username: username, password: password};
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/verifyUser', body);
  }
  
  resendOtp = (username: any): Observable<UserDetails> => {
    const body = { username: username };
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/resendOtp', body);
  }
  
  checkUserNameAndEmail = (username: any, email:any): Observable<UserDetails> => {
    const body = { username: username, email: email };
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/forgotPassword', body);
  }
  
  changePassword = (username: any, password:any, newpassword:any): Observable<UserDetails> => {
    const body = { username: username, password: password, newpassword:newpassword };
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/changePassword', body);
  }

  verifyUserName = (username : any): Observable<UserDetails> => {
   
    return this.http.get<UserDetails>(this.baseUrl + '/UserDetails/verifyusername/?username='+username);
  }

  verifyEmail = (email : any): Observable<UserDetails> => {
   
    return this.http.get<UserDetails>(this.baseUrl + '/UserDetails/verifyemail/?email='+email);
  }

  verifyPhone = (phoneNo : any): Observable<UserDetails> => {
   
    return this.http.get<UserDetails>(this.baseUrl + '/UserDetails/verifyphone/?phone='+phoneNo);
  }
}
