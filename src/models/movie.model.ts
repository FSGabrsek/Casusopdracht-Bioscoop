import { MovieScreening } from "./movie-screening.model";

export class Movie {
    private _title: string;
    private _screenings: MovieScreening[] = [];
    
    constructor(
        title: string
    ) {
        this._title = title;
    }

    addScreening(screening: MovieScreening): void {
        this._screenings.push(screening);
    }
}