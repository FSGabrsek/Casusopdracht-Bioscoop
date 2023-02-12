import { MovieTicket } from "../../movie-ticket.model";

export interface OrderState {
    addSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void;
    removeSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void;
    timedOperation(): void;
    submit(reservations: MovieTicket[]): void;
    cancel(): void;
    checkout(): void;
}