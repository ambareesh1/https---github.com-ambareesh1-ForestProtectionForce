import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserTypes } from '../Models/UserTypes';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private baseUrl : string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

   }

   getUserTypes(){
    return  this.http.get<UserTypes[]>(this.baseUrl+'/UserTypes');
  }

  getUserTypesById(id:any){
    return  this.http.get<UserTypes>(this.baseUrl+'/UserTypes/' +id);
  }

  createUserTypes(userType: UserTypes): Observable<UserTypes> {
    return this.http.post<UserTypes>(this.baseUrl+'/UserTypes', userType);
  }

  deleteUserTypes(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/UserTypes/'+id+'');
  }
}
