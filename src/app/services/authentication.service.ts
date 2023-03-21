import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../Models/User';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http : HttpClient, private sharedService : SharedService) { }

  validateCredentials = (username:any, password:any):Observable<any>=>{
   // this.http.get<any[]>(this.baseUrl+'/Baselines');
   return new Observable();
  }

  sendOtp = (user:User) =>{

  }

  isLoggedIn(): Observable<boolean> {
    return this.sharedService.getUserDetails()?.username.length>0 ? of(true) : of(false);
  }

}
