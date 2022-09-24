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
