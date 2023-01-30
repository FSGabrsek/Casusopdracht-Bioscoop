import { Movie } from "./movie.model";

export class MovieScreening {
    private _dateAndTime: Date;
    private _pricePerSeat: number;

    constructor(
        movie: Movie,
        dateAndTime: Date,
        pricePerSeat: number
    ) {
        this._dateAndTime = dateAndTime;
        this._pricePerSeat = pricePerSeat;
    }

    
    public get pricePerSeat() : number {
        return this._pricePerSeat
    }
}