import { MovieTicket } from "../movie-ticket.model";
import { PriceStrategy } from "./strategies/price.strategy";
import { ExportStrategy } from "./strategies/export.strategy";
import { OrderState } from "./states/order.state";
import { OpenState } from "./states/open.state";
import Publisher from "../observer/publisher.observer";
import Subscriber from "../observer/subscriber.observer";

export class Order implements Publisher<string> {
    private _seatReservations: MovieTicket[] = [];

    private _orderNr: number;
    private _priceStrategy: PriceStrategy;
    private _exportStrategy: ExportStrategy;

    private _state: OrderState;

    private _subscriptions: Subscriber<string>[] = [];

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

    subscribe(subscriber: Subscriber<string>): void {
        this._subscriptions.push(subscriber);
    }

    unsubscribe(subscriber: Subscriber<string>): void {
        this._subscriptions = this._subscriptions.filter(sub => sub != subscriber);
    }

    publish(event: string): void {
        this._subscriptions.forEach(sub => sub.next(event));
    }
    
    addSeatReservation(ticket: MovieTicket): void {
        this._state.addSeatReservation(ticket, this._seatReservations);
    }

    removeSeatReservation(ticket: MovieTicket): void {
        this._state.removeSeatReservation(ticket, this._seatReservations);
    }

    timedOperation(): void {
        this._state.timedOperation();
    }

    submit(): void {
        this._state.submit(this._seatReservations);
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