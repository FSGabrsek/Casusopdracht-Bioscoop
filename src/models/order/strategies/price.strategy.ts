import { MovieTicket } from "../../movie-ticket.model";

export interface PriceStrategy {
    calculatePrice(reservations: MovieTicket[]): number
}