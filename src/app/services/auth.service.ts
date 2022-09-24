import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { LoginRequest, Token, RegisterRequest } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public setToken(response: Token) {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  constructor(private http: HttpClient) { }

  public get isAuthenticated(): boolean {
    return !this.isTokenExpired(localStorage.getItem('accessToken'));
  }

  public get isRefreshTokenValid(): boolean {
    return !this.isTokenExpired(localStorage.getItem('refreshToken'));
  }

  isTokenExpired(token: string): boolean {
    if(!token) {
      return true;
    }
    const exp = (JSON.parse( atob(token.split('.')[1]))).exp * 1000;
    return new Date() > new Date(exp);
  }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${environment.authenticationServerUrl}/register`, registerRequest)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  login(loginRequest: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${environment.authenticationServerUrl}/login`, loginRequest)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.http.post(`${environment.authenticationServerUrl}/logout`, null, {
      params: {
        'refreshToken': localStorage.getItem('refreshToken')
      }
    }).pipe(
        catchError(this.handleError.bind(this))
      ).subscribe(() => {
        localStorage.clear();
      })
  }

  refreshToken(): Observable<Token> {
    const refreshRequest: Token = {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    }

    return this.http.post<Token>(`${environment.authenticationServerUrl}/refreshToken`, refreshRequest)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap((response) => {
          localStorage.setItem('accessToken', response.accessToken);
        })
      )
  }

  handleError(error) {
    return throwError(() => error);
  }
}
