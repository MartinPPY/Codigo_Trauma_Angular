export interface Medic {
    id?:number
    availability: boolean,
    email: string,
    lastname: string,
    name: string,
    phone: number
}

export interface Emergency{
    description:string,
    victims:number,
    severity:string,
    medics:number[]
}