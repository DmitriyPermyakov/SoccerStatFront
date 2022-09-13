import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { League } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  public leagues: League[] = [];
  constructor(private http: HttpClient) { }

  create(league: League): Observable<League> {
    return this.http.post<League>(`${environment.resourceServerUrl}/league/create`, league)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  getAll(): Observable<League[]> {
    return this.http.get<League[]>(`${environment.resourceServerUrl}/league/getall`)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  getById(id: string): Observable<League> {
    return this.http.get<League>(`${environment.resourceServerUrl}/league/getById/${id}`)
    .pipe(
      catchError(this.handleError.bind(this))
    )
  }

  update(league: League): Observable<League> {
    return this.http.put<League>(`${environment.resourceServerUrl}/league/update`, league)
    .pipe(
      catchError(this.handleError.bind(this))
    )
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.resourceServerUrl}/league/remove/${id}`);
  }

  handleError(error) {
    return throwError(() => error)
  }
}
