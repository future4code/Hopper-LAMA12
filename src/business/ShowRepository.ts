import { DAY_TYPES, show } from "../model/Show";

export interface ShowRepository {
    insertShow(show: show) : Promise<void>
    selectShowByDate(weekDate: DAY_TYPES, startTime: number, endTime: number): Promise<any>
    selectShows(weekDay: string): Promise<any>

}