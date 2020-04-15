import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthLockService } from './services/auth-lock.service';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        if(!loggedIn) {
          console.log("here")
          this.auth.login(state.url)
        }
      })
    );
    
    
    // if(!this.auth.isAuthenticated()){
    //   setTimeout(() => {
    //     this.router.navigate[('')];
    //   }, 1000)
    // }

    // return this.auth.isAuthenticated()
  }
  
}
