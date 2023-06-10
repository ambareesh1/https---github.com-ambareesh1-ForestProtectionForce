import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HistorySheet } from '../Models/HistorySheet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorysheetService {


  constructor(private http: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

  getHostorySheet(){
    return  this.http.get<HistorySheet[]>(this.baseUrl+'/HistorySheet');
  }

  getHostorySheetbyId(id : any){
    return  this.http.get<HistorySheet>(this.baseUrl+'/HistorySheet/'+id);
  }

  createHistorySheet(historySheet: HistorySheet): Observable<HistorySheet> {
    return this.http.post<HistorySheet>(this.baseUrl+'/HistorySheet', historySheet);
  } 

  updateHistorySheet(id: number, historySheet: HistorySheet): Observable<any> {
   
    return this.http.put(this.baseUrl+'/HistorySheet/'+id, historySheet);
  }

}
