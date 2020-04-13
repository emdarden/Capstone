import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, RouterStateSnapshot } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthLockService {
  state: RouterStateSnapshot;

  auth0Options = {
    theme : {
      logo: '../../assets/imgs/journi_logo.png',
      primaryColor: '#c4432a'
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientID,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }

        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        console.log(this.state.url);

        this.router.navigate(["/"])
      })
    });

    this.lock.on('authorization_error', error => {
      console.log('something went wrong', error);
    });

   }

   login() {
     this.lock.show();
   }

   logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
   }

   isAuthenticated() {
     return tokenNotExpired();
   }
}
