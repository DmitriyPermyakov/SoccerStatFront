import { Time } from "@angular/common"

export interface League {
    id?: string,
    imageUrl: string,
    name: string,
    country: string
}

export interface Team {
    id?: string,
    imageUrl: string,
    name: string,
    leagueId: string
}

export interface RegisterRequest {
    email: string,
    password: string,
    passwordConfirm: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface Token {
    accessToken: string,
    refreshToken: string
}

export interface Match {
    id: string,
    date: Date,    
    status: Status,
    leagueId: string,    
    homeTeamId: string,    
    awayTeamId: string,    
    homeTeamFullTime: number,
    awayTeamFullTime: number,
    homeTeamExtraTime: number,
    awayTeamExtraTime: number,
    homeTeamPenalties: number,
    awayTeamPenalties: number
}

export interface MatchResponse {
    id: string,
    date: Date,
    time: Time,
    status: Status,
    league: League,
    homeTeam: Team,
    awayTeam: Team,  
    homeTeamFullTime: number,
    awayTeamFullTime: number,
    homeTeamExtraTime: number,
    awayTeamExtraTime: number,
    homeTeamPenalties: number,
    awayTeamPenalties: number
}

export enum Status {
    SCHEDULED = 'SCHEDULED',
    LIVE = 'LIVE',
    IN_PLAY = 'IN_PLAY',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED',
    POSTPONED = 'POSTPONED',
    SUSPENDED = 'SUSPENDED',
    CANCELED = 'CENCELED'
}
