export interface loginResponse {
    role: string,
    message: string,
    token: string,
    username: string
}

export interface loginResponseError {
    error: string,
    message: string
}