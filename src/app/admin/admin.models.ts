export interface Medic {
    id?: number
    availability: boolean,
    email: string,
    lastname: string,
    name: string,
    phone: number
}

export interface Emergency {
    description: string,
    victims: number,
    severity: string,
    medics: number[]
}

export interface EmergencyView {
    id: number,
    description: string,
    victims: number,
    severity: string,
    status: string,
    comments: string,
    creation: string,
    updateAt: string,
    finishedAt: string,
    medicNames: string[]
}

