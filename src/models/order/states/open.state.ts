import IllegalStateException from "../../../errors/illegal-state.exception";
import { MovieTicket } from "../../movie-ticket.model";
import { Order } from "../order.model";
import { OrderState } from "./order.state";
import { SavedState } from "./saved.state";

export class OpenState implements OrderState {
    private _context: Order;

    constructor(context: Order) {
        this._context = context;
    }
    addSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void {
        reservations.push(ticket);
    }
    removeSeatReservation(ticket: MovieTicket, reservations: MovieTicket[]): void {
        reservations = reservations.filter(reservation => reservation != ticket);
    }
    timedOperation(): void {
        throw new IllegalStateException();
    }
    submit(): void {
        this._context.state = new SavedState(this._context);
    }
    cancel(): void {
        // delete order
    }
    checkout(): void {
        throw new IllegalStateException();
    }

}