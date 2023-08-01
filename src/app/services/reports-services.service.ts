import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FormAReportModel } from '../Models/ReportsAModel';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';
import { Seizure_CasesOfMonth_FormC } from '../Models/Seizures_Cases_Of_Month_Form_C';

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

  getFormBReport = (district:number,month:number)=>{
    return this.http.get<Seizure_GammaUni_FormB[]>(`${this.baseUrl}/Reports/GetGammaUnitFormBReport?id=${district}&month=${month}`);
  }

  getFormCReport = (district:number,month:number)=>{
    return this.http.get<Seizure_CasesOfMonth_FormC[]>(`${this.baseUrl}/Reports/GetGammaUnitFormCReport?id=${district}&month=${month}`);
  }

  getAbstractFormReport = (district:number,month:number)=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetGammaUnitAbstractFormReport?id=${district}&month=${month}`);
  }

  getMonthMFFormReport = (district:number,month:number)=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetMonthCFFormReport?id=${district}&month=${month}`);
  }

}
