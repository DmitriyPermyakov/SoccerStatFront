import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
    if(this.auth.isAuthenticated) {
      console.log('isAuthenticated')
      return true;
    } else {
      if(this.auth.isRefreshTokenValid) {
        this.auth.refreshToken()
          .subscribe(() => {
            if(this.auth.isAuthenticated) {
              console.log('refreshing')
              this.router.navigate([`${state.url}`]);
              return true;
            }
            return this.auth.isAuthenticated;
          });
      } else {
        this.auth.logout();
        return this.auth.isAuthenticated;
      }
    }
    return this.auth.isAuthenticated;
  }
}
