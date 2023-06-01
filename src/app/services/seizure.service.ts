import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { Observable } from 'rxjs';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';
import { Seizure_CasesOfMonth_FormC } from '../Models/Seizures_Cases_Of_Month_Form_C';
import { SeizureManAnimalConflict } from '../Models/SeizureManAnimalConflict';
import { ForestFire } from '../Models/ForestFire';
import { ComplaintsRegistered } from '../Models/ComplaintsRegistered';

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

// FORM C - Cases of Month
CheckSeizureClreadyExistForDistrictAndMonth (id:any){
  return  this.http.get<Seizure_CasesOfMonth_FormC[]>(this.baseUrl+'/Seizures/CheckSeizureClreadyExistForDistrictAndMonth/?id='+id);
}

createSeizureReport_C(formC: Seizure_CasesOfMonth_FormC): Observable<Seizure_CasesOfMonth_FormC> {
  return this.http.post<Seizure_CasesOfMonth_FormC>(this.baseUrl+'/Seizures/PostCasesOfMonthFormC', formC);
 } 
 
 updateFormC(id: number, formC: Seizure_CasesOfMonth_FormC[]): Observable<any> {
 
  return this.http.put(this.baseUrl+'/Seizures/UpdateCaseOfMonthFromC/?id='+id, formC);
 }

 // Man Animal Conflict 
 
 CheckManAnimalConflictAlreadyExistForDistrictAndMonth (id:any){
  return  this.http.get<SeizureManAnimalConflict[]>(this.baseUrl+'/Seizures/CheckManAnimalConflictAlreadyExistForDistrictAndMonth/?id='+id);
}

createManAnimalConflict(manAnimalConflict: SeizureManAnimalConflict): Observable<SeizureManAnimalConflict> {
  return this.http.post<SeizureManAnimalConflict>(this.baseUrl+'/Seizures/PostCasesOfMonthManAnimalConflict', manAnimalConflict);
 } 
 
 updateManAnimal(id: number, manAnimalConflict: SeizureManAnimalConflict): Observable<any> {
 
  return this.http.put(this.baseUrl+'/Seizures/UpdateMonthManAnimalConflict/?id='+id, manAnimalConflict);
 }

  // Forest Fire Incident
 
  CheckForestFireAlreadyExistForDistrictAndMonth (id:any){
    return  this.http.get<ForestFire[]>(this.baseUrl+'/Seizures/CheckFireIncidentAlreadyExistForDistrictAndMonth/?id='+id);
  }
  
  createForestFire(forestFire: ForestFire): Observable<ForestFire> {
    return this.http.post<ForestFire>(this.baseUrl+'/Seizures/PostFireIncident', forestFire);
   } 
   
   updateForestFire(id: number, forestFire: ForestFire): Observable<any> {
   
    return this.http.put(this.baseUrl+'/Seizures/UpdateFireIncident/?id='+id, forestFire);
   }

     // Complaints Registered
 
  CheckComplaintsRegisteredlreadyExistForDistrictAndMonth (id:any){
    return  this.http.get<ComplaintsRegistered[]>(this.baseUrl+'/Seizures/CheckComplaintsRegisteredAlreadyExistForDistrictAndMonth/?id='+id);
  }
  
  createComplaintsRegistered(forestFire: ComplaintsRegistered): Observable<ComplaintsRegistered> {
    return this.http.post<ComplaintsRegistered>(this.baseUrl+'/Seizures/PostComplaintsRegistered', forestFire);
   } 
   
   updateComplaintsRegistered(id: number, forestFire: ComplaintsRegistered): Observable<any> {
   
    return this.http.put(this.baseUrl+'/Seizures/PostComplaintsRegistered/?id='+id, forestFire);
   }

}
