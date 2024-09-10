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
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/sign-in']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setResetPass(data: object): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
