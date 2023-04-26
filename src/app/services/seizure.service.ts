import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeizureService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

 getFormA(){
   return  this.http.get<Seizures_Form_A[]>(this.baseUrl+'/Seizures');
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

}
