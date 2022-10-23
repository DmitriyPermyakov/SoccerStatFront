import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match, MatchResponse } from '../interfaces/interfaces';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient, private errorHandling: ErrorHandlingService) { }

  create(match: Match): Observable<Match> {
    return this.http.post<Match>(`${environment.resourceServerUrl}/match/create`, match)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      );
  }

  getAll(): Observable<MatchResponse[]> {
    return this.http.get<MatchResponse[]>(`${environment.resourceServerUrl}/match/getall`)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      );
  }

  getMatchByLeagueId(id:string): Observable<MatchResponse[]> {
    return this.http.get<MatchResponse[]>(`${environment.resourceServerUrl}/match/getMatchesByLeagueId/${id}`)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      );
  }

  getMatchByTeamId(id:string): Observable<MatchResponse[]> {
    return this.http.get<MatchResponse[]>(`${environment.resourceServerUrl}/match/getMatchesByTeamId/${id}`)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      );
  }

  getById(id: string): Observable<Match> {
    return this.http.get<Match>(`${environment.resourceServerUrl}/match/getById/${id}`)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      )
  }

  update(match: Match): Observable<Match> {
    return this.http.put<Match>(`${environment.resourceServerUrl}/match/update`, match)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.resourceServerUrl}/match/remove/${id}`)
      .pipe(
        catchError(this.errorHandling.handleError.bind(this))
      )
  }  
}
