import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUser } from '../Models/AdmimUsersModel';
@Injectable({
  providedIn: 'root'
})
export class AdminusersService {

  constructor(private http: HttpClient) {

 
   }

   async getAdminUsersList() {
    const res = await this.http.get<any>('assets/adminusers.json')
       .toPromise();
     const data = <AdminUser[]>res.data;
     return data;
}



}
