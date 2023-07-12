import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FormAReportModel } from '../Models/ReportsAModel';

@Injectable({
  providedIn: 'root'
})
export class ReportsServicesService {

  constructor(private http: HttpClient) { 
    
  }

  baseUrl = environment.apiBaseUrl;

  getFormAReport(){
    return  this.http.get<any[]>(this.baseUrl+'/Reports');
  }


}
