import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getUserDetails=()=>{
    const user = window.localStorage.getItem('userDetails')
    return user ? JSON.parse(user) : [];

  }
}
