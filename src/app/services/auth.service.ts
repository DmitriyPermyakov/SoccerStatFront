import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): string {
    return ''
  }

  private setToken(response: LoginResponse) {
    console.log(response);
  }

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${environment.authenticationServerUrl}/register`, registerRequest)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authenticationServerUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.setToken(response)
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {

  }

  refreshToken() {

  }

  handleError(error) {
    return throwError(() => error);
  }
}
