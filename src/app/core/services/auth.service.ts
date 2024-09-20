import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData: any = null;
  setSignUpForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  setSignInForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      try {
        this.userData = jwtDecode(localStorage.getItem('userToken')!);
        console.log(this.userData);
      } catch {
        this._Router.navigate(['/sign-in']);
        localStorage.clear();
      }
    }
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('cartOwnerId');
    localStorage.clear();
    this.userData = null;
    this._Router.navigate(['/sign-in']);
  }

  setEmailVerify(data: any): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: any): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setResetPass(data: any): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
