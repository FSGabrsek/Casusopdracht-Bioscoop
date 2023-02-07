import { TicketExportFormat } from "../../enums/ticket-export-format.enum";
import { MovieTicket } from "../movie-ticket.model";
import { writeFileSync } from 'node:fs'
import { PriceStrategy } from "./strategies/price.strategy";
import { ExportStrategy } from "./strategies/export.strategy";

export abstract class Order {
    private _seatReservations: MovieTicket[] = [];

    private _orderNr: number;
    private _priceStrategy: PriceStrategy;
    private _exportStrategy: ExportStrategy;

    constructor(
        orderNr: number,
        priceStrategy: PriceStrategy,
        exportStrategy: ExportStrategy
    ) {
        this._orderNr = orderNr;
        this._priceStrategy = priceStrategy;
        this._exportStrategy = exportStrategy
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