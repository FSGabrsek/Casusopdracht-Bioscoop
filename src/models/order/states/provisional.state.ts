import IllegalStateException from "../../../errors/illegal-state.exception";
import { MovieTicket } from "../../movie-ticket.model";
import { Order } from "../order.model";
import { OrderState } from "./order.state";
import { ProcessedState } from "./processed.state";

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
    submit(reservations: MovieTicket[]): void {
        throw new IllegalStateException();
    }
    cancel(): void {
        // deleteOrder();
    }
    checkout(): void {
        this._context.publish(`order ${this._context.orderNr} has been processed`);
        this._context.state = new ProcessedState(this._context);
    }
}