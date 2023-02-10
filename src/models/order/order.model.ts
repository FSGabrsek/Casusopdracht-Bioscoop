import { MovieTicket } from "../movie-ticket.model";
import { PriceStrategy } from "./strategies/price.strategy";
import { ExportStrategy } from "./strategies/export.strategy";
import { OrderState } from "./states/order.state";
import { OpenState } from "./states/open.state";

export class Order {
    private _seatReservations: MovieTicket[] = [];

    private _orderNr: number;
    private _priceStrategy: PriceStrategy;
    private _exportStrategy: ExportStrategy;

    private _state: OrderState;

    constructor(
        orderNr: number,
        priceStrategy: PriceStrategy,
        exportStrategy: ExportStrategy
    ) {
        this._orderNr = orderNr;
        this._priceStrategy = priceStrategy;
        this._exportStrategy = exportStrategy

        this._state = new OpenState(this);
    }

    public set state(value: OrderState) {
        this._state = value;
    }

    public get orderNr() : number {
        return this._orderNr;
    }
    
    addSeatReservation(ticket: MovieTicket): void {
        this._state.addSeatReservation(ticket, this._seatReservations);
    }

    removeSeatReservation(ticket: MovieTicket): void {
        this._state.removeSeatReservation(ticket, this._seatReservations);
    }

    submit(): void {
        this._state.submit();
    }

    cancel(): void {
        this._state.cancel();
    }

    checkout(): void {
        this._state.checkout();
    }

    calculatePrice(): number {
        return this._priceStrategy.calculatePrice(this._seatReservations);
    }

    export(): void {
        this._exportStrategy.export(this);
    }
}