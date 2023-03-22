import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaselineModel } from '../Models/BaselineModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class BaselinedataService {

  constructor(private http: HttpClient) { }

   baseUrl = environment.apiBaseUrl;

  getBaseline(){
    return  this.http.get<BaselineModel[]>(this.baseUrl+'/Baselines');
  }
  
  createBaseline(baselinedata: BaselineModel): Observable<BaselineModel> {
    console.log(baselinedata);
    return this.http.post<BaselineModel>(this.baseUrl+'/Baselines', baselinedata);
  }

 updateBaselinet(id: number, baselinedata: BaselineModel): Observable<any> {
    return this.http.put(this.baseUrl+'/Baselines/'+id+'', baselinedata);
  }
  
  deleteBaselinet(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/Baselines/'+id+'');
  }
}
