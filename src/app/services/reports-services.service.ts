import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FormAReportModel } from '../Models/ReportsAModel';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';
import { Seizure_CasesOfMonth_FormC } from '../Models/Seizures_Cases_Of_Month_Form_C';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsServicesService {

  constructor(private http: HttpClient) { 
    
  }

  baseUrl = environment.apiBaseUrl;

  getFormAReport(district:number, month:number, year : number, isJoint:boolean, province:any){
    return  this.http.get<any[]>(`${this.baseUrl}/Reports/GetFormAReport?districtId=${district}&month=${month}&year=${year}&isJoint=${isJoint}&province=${province}`);
  }

  getFormBReport = (district:number,month:number, year : number, province:any)=>{
    return this.http.get<Seizure_GammaUni_FormB[]>(`${this.baseUrl}/Reports/GetGammaUnitFormBReport?districtId=${district}&month=${month}&year=${year}&province=${province}`);
  }

  getFormCReport = (district:number,month:number, year : number, province:any)=>{
    return this.http.get<Seizure_CasesOfMonth_FormC[]>(`${this.baseUrl}/Reports/GetGammaUnitFormCReport?districtId=${district}&month=${month}&year=${year}&province=${province}`);
  }
  
  getAbstractFormReport(district: number, month: number, year: number, selectedOptions: string[], typeOfDateSelection : string, province:any): Observable<any[]> {
    const requestBody = {
      districtId: district,
      month: month,
      year: year,
      selectedOptions: selectedOptions,
      TypeOfSelection:typeOfDateSelection,
      province:province
    };

    return this.http.post<any[]>(`${this.baseUrl}/Reports/GetGammaUnitAbstractFormReport`, requestBody);
  }

  getMonthMFFormReport = (district:number,month:number, year : number, isFinancialYearSelected:boolean, typeOfSelection:string='month', province:any)=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetMonthCFFormReport?districtId=${district}&month=${month}&year=${year}&isFinancialYearSelected=${isFinancialYearSelected}&typeOfSelection=${typeOfSelection}&province=${province}`);
  }

  getItemNamesFromSezureOne = ()=>{
    return this.http.get<any[]>(`${this.baseUrl}/Reports/GetItemNamesFromSeizureA`);
  }

}
