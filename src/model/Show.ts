export enum DAY_TYPES {
    SEXTA = 'SEXTA',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO'
}

export type show = {
    id: string
    weekDay: DAY_TYPES
    startTime: number
    endTime: number
    bandId: string
}

export interface RegisterShowDTO {
    weekDay: DAY_TYPES
    startTime: number
    endTime: number
    bandId: string
    token: string
}

export interface GetShowsDTO {
    weekDay: DAY_TYPES
}

export type shows = {
    nameBand: string
    genre: string
}