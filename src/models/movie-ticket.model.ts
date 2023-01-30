import { MovieScreening } from "./movie-screening.model";

export class MovieTicket {
    private _rowNr: number;
    private _seatNr: number;
    private _isPremium: boolean;

    constructor(
        movieScreening: MovieScreening,
        isPremiumReservation: boolean,
        rowNr: number,
        seatNr: number,
    ) {
        this._rowNr = rowNr;
        this._seatNr = seatNr;
        this._isPremium = isPremiumReservation;
    }

    isPremiumTicket(): boolean {
        return this._isPremium;
    }

    
    public get Price() : number {
        return -1;
    }
}