import { TicketExportFormat } from "../../enums/ticket-export-format.enum";
import { MovieTicket } from "../movie-ticket.model";
import { writeFileSync } from 'node:fs'
import { PriceStrategy } from "./strategies/price.strategy";

export abstract class Order {
    private _seatReservations: MovieTicket[] = [];

    private _orderNr: number;
    private _priceStrategy: PriceStrategy;

    constructor(
        orderNr: number,
        priceStrategy: PriceStrategy
    ) {
        this._orderNr = orderNr;
        this._priceStrategy = priceStrategy;
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

    export(exportFormat: TicketExportFormat): void {
        switch (exportFormat) {
            case TicketExportFormat.json:
                writeFileSync(`./out/order${this._orderNr}.json`, JSON.stringify(this));
                break;
            case TicketExportFormat.plaintext:
                writeFileSync(`./out/order${this._orderNr}.txt`, JSON.stringify(this));
                break;
            default:
                throw new Error("unknown export format");
        }
    }
}