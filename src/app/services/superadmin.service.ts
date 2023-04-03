import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superadmin } from '../Models/Superadmin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {
  
  private baseUrl : string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

  }

  getSuperadminDetails(){
    return  this.http.get<Superadmin[]>(this.baseUrl+'/superadmin');
  }

  validateCredentials = (username: any, password: any, otp: any): Observable<Superadmin> => {
    const body = { username: username, password: password, otp: otp };
    return this.http.post<Superadmin>(this.baseUrl + '/Superadmin/verifySuperAdminUser', body);
  }

  editSuperAdminDetails(UserDetails: Superadmin, id: any): Observable<Superadmin> {
    return this.http.put<Superadmin>(this.baseUrl + '/Superadmin/'+ id, UserDetails);
  }
  changeSuperPassword = (username: any, password:any, newpassword:any): Observable<Superadmin> => {
    const body = { username: username, password: password, newpassword:newpassword };
    return this.http.post<Superadmin>(this.baseUrl + '/Superadmin/changeSuperPassword', body);
  }
}
