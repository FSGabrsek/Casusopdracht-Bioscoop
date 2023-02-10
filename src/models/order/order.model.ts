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

    state: OrderState;

    constructor(
        orderNr: number,
        priceStrategy: PriceStrategy,
        exportStrategy: ExportStrategy
    ) {
        this._orderNr = orderNr;
        this._priceStrategy = priceStrategy;
        this._exportStrategy = exportStrategy

        this.state = new OpenState(this);
    }
    
    public get orderNr() : number {
        return this._orderNr;
    }
    
    addSeatReservation(ticket: MovieTicket): void {
        this._seatReservations.push(ticket);
    }

    calculatePrice(): number {
        return this._priceStrategy.calculatePrice(this._seatReservations);
    }

    export(): void {
        this._exportStrategy.export(this);
    }
}