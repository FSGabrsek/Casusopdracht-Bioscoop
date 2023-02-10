import IllegalStateException from "../../../errors/illegal-state.exception";
import { MovieTicket } from "../../movie-ticket.model";
import { Order } from "../order.model";
import { OrderState } from "./order.state";
import { ProcessedState } from "./processed.state";
import { ProvisionalState } from "./provisional.state";

export class SavedState implements OrderState {
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
        // sendAlert();
        this._context.state = new ProvisionalState(this._context);
    }
    submit(): void {
        throw new IllegalStateException();
    }
    cancel(): void {
        // deleteOrder();
    }
    checkout(): void {
        // processPayment();
        this._context.state = new ProcessedState(this._context);
    }
}