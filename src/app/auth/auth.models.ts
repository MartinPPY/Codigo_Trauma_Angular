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

export interface RegisterRequest {
    username: string,
    name: string,
    lastname: string,
    phone: number,
    password: string,
    email: string
}

export interface RegisterErrorResponse {
    error: {
        message: string
    }
}