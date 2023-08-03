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

  getFormAReport(district:number, month:number, year : number){
    return  this.http.get<any[]>(`${this.baseUrl}/Reports/GetFormAReport?districtId=${district}&month=${month}&year=${year}`);
  }

  getFormBReport = (district:number,month:number, year : number)=>{
    return this.http.get<Seizure_GammaUni_FormB[]>(`${this.baseUrl}/Reports/GetGammaUnitFormBReport?districtId=${district}&month=${month}&year=${year}`);
  }

  getFormCReport = (district:number,month:number, year : number)=>{
    return this.http.get<Seizure_CasesOfMonth_FormC[]>(`${this.baseUrl}/Reports/GetGammaUnitFormCReport?districtId=${district}&month=${month}&year=${year}`);
  }

  getAbstractFormReport = (district:number,month:number, year : number)=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetGammaUnitAbstractFormReport?districtId=${district}&month=${month}&year=${year}`);
  }

  getMonthMFFormReport = (district:number,month:number, year : number, isFinancialYearSelected:boolean)=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetMonthCFFormReport?districtId=${district}&month=${month}&year=${year}&isFinancialYearSelected=${isFinancialYearSelected}`);
  }

}
