import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { Circle, CircleView, Compartment, CompartmentView, District, DistrictView, Division, DivisionView, Province } from '../Models/ManageDataModels';

@Injectable({
  providedIn: 'root'
})
export class ManagedataService {

  private baseUrl : string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

   }

   // -------------------- PROVINCE -----------------------

   getProvince(){
    return  this.http.get<Province[]>(this.baseUrl+'/Provinces');
  }

  updateProvince(id: number, province: Province): Observable<any>{
    return this.http.put(this.baseUrl+'/Provinces/'+id+'', province);
  }

  getProvinceByid = (id:any) =>{
    return  this.http.get<Province>(this.baseUrl+'/Provinces/'+id+'');
  }
  getProvinceByName(name:any){
    return  this.http.get<Province>(this.baseUrl+'/Provinces/GetProvinceByName/?name='+name);

  }

  createProvince(province: Province): Observable<Province> {
    console.log(province);
    return this.http.post<Province>(this.baseUrl+'/Provinces', province);
  }

  deleteProvince(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/Provinces/'+id+'');
  }

  // -------------------- CIRCLE -----------------------
  getCircle(){
    return  this.http.get<CircleView[]>(this.baseUrl+'/Circles');
  }

  updateCircle(id: number, circle: Circle): Observable<any>{
    return this.http.put(this.baseUrl+'/Circles/'+id+'', circle);
  }

  getCircleByid = (id:any) =>{
    return  this.http.get<CircleView>(this.baseUrl+'/Circles/'+id+'');
  }
  getCircleByName(name:any){
    return  this.http.get<CircleView>(this.baseUrl+'/Circles/GetCircleByName/?name='+name);

  }
  createCircle(circle: Circle): Observable<Circle> {

    return this.http.post<Circle>(this.baseUrl+'/Circles', circle);
  }

  deleteCircle(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/Circles/'+id+'');
  }

// -------------------- DISTRICT -----------------------

getDistrict(){
  return  this.http.get<DistrictView[]>(this.baseUrl+'/Districts');
}

getDistrictByName(name:any){
  return  this.http.get<DistrictView>(this.baseUrl+'/Districts/GetDistrictByName/?name='+name);
}

updateDistrict(id: number, district: District): Observable<any>{
  return this.http.put(this.baseUrl+'/Districts/'+id+'', district);
}

getDistricteByid = (id:any) =>{
  return  this.http.get<DistrictView>(this.baseUrl+'/Districts/'+id+'');
}
createDistrict(district: District): Observable<District> {

  return this.http.post<District>(this.baseUrl+'/Districts', district);
}

deleteDistrict(id: number): Observable<any> {
  return this.http.delete(this.baseUrl+'/Districts/'+id+'');
}

// -------------------- DIVISION -----------------------

getDivison(){
  return  this.http.get<DivisionView[]>(this.baseUrl+'/Divisions');
}

getDivisonByName(name:any){
  return  this.http.get<DivisionView[]>(this.baseUrl+'/Divisions/GetDivisonByName/?name='+name);

}

updateDivision(id: number, division: Division): Observable<any>{
  return this.http.put(this.baseUrl+'/Divisions/'+id+'', division);
}

createDivison(division: Division): Observable<Division> {

  return this.http.post<Division>(this.baseUrl+'/Divisions', division);
}

deleteDivison(id: number): Observable<any> {
  return this.http.delete(this.baseUrl+'/Divisions/'+id+'');
}

// -------------------- Compartment -----------------------

getCompartment(){
  return  this.http.get<CompartmentView[]>(this.baseUrl+'/Compartments');
}

getCompartmentByName(name:any){
  return  this.http.get<DivisionView[]>(this.baseUrl+'/Compartments/GetCompartmentByName/?name='+name);

}

updateCompartment(id: number, compartment: Compartment): Observable<any>{
  return this.http.put(this.baseUrl+'/Compartments/'+id+'', compartment);
}

createCompartment(compartment: Compartment): Observable<Compartment> {

  return this.http.post<Compartment>(this.baseUrl+'/Compartments', compartment);
}



deleteCompartment(id: number): Observable<any> {
  return this.http.delete(this.baseUrl+'/Compartments/'+id+'');
}

}
