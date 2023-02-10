import IllegalStateException from "../../../errors/illegal-state.exception";
import { MovieTicket } from "../../movie-ticket.model";
import { Order } from "../order.model";
import { OrderState } from "./order.state";

export class ProvisionalState implements OrderState {
    private _context: Order;

    constructor(context: Order) {
        this._context = context;
    }

    addSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void {
        throw new IllegalStateException();
    }
    removeSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void {
        throw new IllegalStateException();
    }
    timedOperation(): void {
        // deleteOrder();
    }
    submit(): void {
        throw new IllegalStateException();
    }
    cancel(): void {
        // deleteOrder();
    }
    checkout(): void {
        // processPayment();
    }
}