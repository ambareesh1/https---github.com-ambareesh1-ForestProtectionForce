import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DisposedCasesModel } from '../Models/DisposedCasesModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisposedCasesService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

  getDisposedCases(){
    return  this.http.get<DisposedCasesModel[]>(this.baseUrl+'/DisposedCases');
  }

  getDisposedCasesbyId(id : any){
    return  this.http.get<DisposedCasesModel>(this.baseUrl+'/DisposedCases/'+id);
  }

  createDisposedCases(disposedCases: DisposedCasesModel): Observable<DisposedCasesModel> {
    return this.http.post<DisposedCasesModel>(this.baseUrl+'/DisposedCases', disposedCases);
  } 

  updateDisposedCases(id: number, disposedCases: DisposedCasesModel): Observable<any> {
   
    return this.http.put(this.baseUrl+'/DisposedCases/'+id, disposedCases);
  }

}
