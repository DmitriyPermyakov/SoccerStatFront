import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  create(team: Team): Observable<Team> {
    return this.http.post<Team>(`${environment.resourceServerUrl}/team/create`, team)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.resourceServerUrl}/team/getAll`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getById(id: string): Observable<Team> {
    return this.http.get<Team>(`${environment.resourceServerUrl}/team/getById/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  update(team: Team): Observable<Team> {
    return this.http.put<Team>(`${environment.resourceServerUrl}/team/update`, team)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.resourceServerUrl}/team/remove/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error) {
    return throwError(() => error);
  }
}
