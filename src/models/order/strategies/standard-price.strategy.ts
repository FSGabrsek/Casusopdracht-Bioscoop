import { MovieTicket } from "../../movie-ticket.model";
import { PriceStrategy } from "./price.strategy";

export class StandardPriceStrategy implements PriceStrategy {
    calculatePrice(reservations: MovieTicket[]): number {
        throw new Error("Method not implemented.");
    }
}