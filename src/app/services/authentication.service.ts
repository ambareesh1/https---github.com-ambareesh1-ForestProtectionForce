import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  validateCredentials = (username:any, password:any):Observable<any>=>{
   // this.http.get<any[]>(this.baseUrl+'/Baselines');
   return new Observable();
  }

  sendOtp = (user:User) =>{

  }
}
