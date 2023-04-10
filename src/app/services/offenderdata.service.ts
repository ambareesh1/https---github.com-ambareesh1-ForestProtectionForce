import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offender } from '../Models/OffenderModel';
@Injectable({
  providedIn: 'root'
})
export class OffenderdataService {
  private baseUrl : string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  upload(file: FormData): Observable<any> {

    return this.http.post<any>(this.baseUrl+'/Offenders/upload', file);
  }

  getOffendersData(){
    return  this.http.get<Offender[]>(this.baseUrl+'/Offenders');
  }

  createOffender(offender: Offender): Observable<Offender> {
    console.log(offender);
    return this.http.post<Offender>(this.baseUrl+'/Offenders', offender);
  }

  UpdateOffendersFromBaseLine(caseId : any,offendars: Offender[]): Observable<any> {
    return this.http.put(this.baseUrl+'/Offenders/UpdateOffendersFromBaseLine?caseId='+caseId, offendars);
  }

  
}
