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
    submit(reservations: MovieTicket[]): void {
        if (reservations.length > 0) {
            this._context.publish(`order ${this._context.orderNr} has been saved`);
            this._context.state = new SavedState(this._context);
        } else {
            throw new Error('cannot submit an order with no reservations');
        }
    }
    cancel(): void {
        this._context.publish(`order ${this._context.orderNr} has been cancelled`);
    }
    checkout(): void {
        throw new IllegalStateException();
    }
}