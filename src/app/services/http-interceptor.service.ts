import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('userDetails')!);
    if (user) {
      req = req.clone({
        setHeaders: {
          'X-User-Data': JSON.stringify(user)
        }
      });
    }

    return next.handle(req);
  }
}

