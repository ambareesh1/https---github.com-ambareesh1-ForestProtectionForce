import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Dashboard } from '../Models/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

 getDashboardDetails(){
   return  this.http.get<Dashboard[]>(this.baseUrl+'/dashboard');
 }
}
