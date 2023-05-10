import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { Observable } from 'rxjs';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';

@Injectable({
  providedIn: 'root'
})
export class SeizureService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

// ----------------------- FORM A ------------------------------

 getFormA(){
   return  this.http.get<Seizures_Form_A[]>(this.baseUrl+'/Seizures');
 }

 getStatusOfFormAAlreadyCreated (id:any){
    return  this.http.get<Seizures_Form_A>(this.baseUrl+'/Seizures/'+id);
 }

 getFormAOnDistrict(id : number){
  return this.http.get<Seizures_Form_A[]>(this.baseUrl+'/Seizures/GetFormAWithDistrict/?districtId='+id);
 }

 createSeizureReport_A(formA: Seizures_Form_A): Observable<Seizures_Form_A> {
  return this.http.post<Seizures_Form_A>(this.baseUrl+'/Seizures/PostFormA', formA);
} 
 
 updateFormA(id: number, formA: Seizures_Form_A): Observable<any> {
  formA.ob_independent = formA.ob_independent.toString();
  formA.during_month_independent = formA.during_month_independent.toString();
  formA.ob_joint = formA.ob_joint.toString();
  formA.total_independent = formA.total_independent.toString();
  formA.total_joint = formA.total_joint.toString();
  formA.during_month_joint = formA.during_month_joint.toString();

  return this.http.put(this.baseUrl+'/Seizures/'+id, formA);
}

// Form B - Gamma Unit


getFormGammaUnitB(){
  return  this.http.get<Seizure_GammaUni_FormB[]>(this.baseUrl+'/Seizures/GammaUnitB');
}

CheckSeizureBlreadyExistForDistrictAndMonth (id:any){
   return  this.http.get<Seizure_GammaUni_FormB>(this.baseUrl+'/Seizures/CheckSeizureBlreadyExistForDistrictAndMonth/?id='+id);
}

getFormBOnDistrict(id : number){
 return this.http.get<Seizure_GammaUni_FormB[]>(this.baseUrl+'/Seizures/GetGammaUnitFormBWithDistrict/?districtId='+id);
}

createSeizureReport_B(formA: Seizure_GammaUni_FormB): Observable<Seizure_GammaUni_FormB> {
 return this.http.post<Seizure_GammaUni_FormB>(this.baseUrl+'/Seizures/PostGammaUnitFormB', formA);
} 

updateFormB(id: number, formA: Seizure_GammaUni_FormB): Observable<any> {

 return this.http.put(this.baseUrl+'/Seizures/UpdateGammaUnitFromB'+id, formA);
}

}
