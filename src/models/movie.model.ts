import { MovieScreening } from "./movie-screening.model";

export class Movie {
    private _screenings: MovieScreening[] = [];
    
    private _title: string;
    
    constructor(
        title: string
    ) {
        this._title = title;
    }

    addScreening(screening: MovieScreening): void {
        this._screenings.push(screening);
    }
}