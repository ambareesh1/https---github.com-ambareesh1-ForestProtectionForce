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

  validateCredentials = (username: any, password: any, otp: any): Observable<UserDetails> => {
    const body = { username: username, password: password, otp: otp };
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/verifyUser', body);
  }
  
  resendOtp = (username: any, otp: any): Observable<UserDetails> => {
    const body = { username: username, otp: otp };
    return this.http.post<UserDetails>(this.baseUrl + '/UserDetails/resendOtp', body);
  }
  

}
