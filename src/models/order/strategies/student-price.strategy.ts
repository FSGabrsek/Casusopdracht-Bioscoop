import { MovieTicket } from "../../movie-ticket.model";
import { PriceStrategy } from "./price.strategy";

export class StudentPriceStrategy implements PriceStrategy {
    calculatePrice(reservations: MovieTicket[]): number {
        throw new Error("Method not implemented.");
    }
}