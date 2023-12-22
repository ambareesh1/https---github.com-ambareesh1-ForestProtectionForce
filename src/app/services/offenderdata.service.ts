import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offender } from '../Models/OffenderModel';
import * as saveAs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class OffenderdataService {
  private baseUrl : string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  upload(file: FormData): Observable<any> {

    return this.http.post<any>(this.baseUrl+'/Offenders/upload', file);
  }

  // uploadImg(file: FormData) : Observable<any> {

  //   return this.http.post<any>(this.baseUrl+'/Offenders/upload', file);
  // }
  uploadImg(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/Offenders/upload`;
    return this.http.post<any>(url, formData);
  }

  async getOffendersData(){
    return  this.http.get<Offender[]>(this.baseUrl+'/Offenders');
  }

  createOffender(offender: Offender): Observable<Offender> {
    console.log(offender);
    return this.http.post<Offender>(this.baseUrl+'/Offenders', offender);
  }

  UpdateOffendersFromBaseLine(caseId : any,offendars: Offender[]): Observable<any> {
    return this.http.put(this.baseUrl+'/Offenders/UpdateOffendersFromBaseLine?caseId='+caseId, offendars);
  }

  UpdateOffendersDetails(id:any, offender: Offender): Observable<any> {
    return this.http.put(this.baseUrl+'/Offenders/'+id,offender);
  }
  
  getOffenderWithAdhar(aadhaarNo:any){
    return  this.http.get<Offender>(this.baseUrl+'/Offenders/GetOffenderWithAadhar/?aadhar='+aadhaarNo);
  }

  removeCaseId(caseId : any,offendars: Offender[]): Observable<any> {
    return this.http.put(this.baseUrl+'/Offenders/RemoveCaseId?caseId='+caseId, offendars);
  }

  downloadFile(url: string, fileName: string): void {
    this.http.get(url, { responseType: 'blob' })
      .subscribe(blob => {
        saveAs(blob, fileName);
      }, error => {
        console.error('Error downloading file:', error);
      });
  }
}
