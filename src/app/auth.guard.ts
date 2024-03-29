import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      if (this.authService.isLoggedIn()) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
    }
    
  
}
