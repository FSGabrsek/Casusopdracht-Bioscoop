import { MovieScreening } from "./movie-screening.model";

export class MovieTicket {
    private _movieScreening: MovieScreening;

    private _rowNr: number;
    private _seatNr: number;
    private _isPremium: boolean;

    constructor(
        movieScreening: MovieScreening,
        isPremiumReservation: boolean,
        rowNr: number,
        seatNr: number,
    ) {
        this._movieScreening = movieScreening;

        this._rowNr = rowNr;
        this._seatNr = seatNr;
        this._isPremium = isPremiumReservation;
    }

    isPremiumTicket(): boolean {
        return this._isPremium;
    }

    
    public get price() : number {
        return -1;
    }

    public get movieScreening() : MovieScreening {
        return this._movieScreening
    }
    
}