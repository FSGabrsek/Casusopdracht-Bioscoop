import { TicketExportFormat } from "../../enums/ticket-export-format.enum";
import { MovieTicket } from "../movie-ticket.model";
import { writeFileSync } from 'node:fs'

export class Order {
    private _seatReservations: MovieTicket[] = [];

    private _orderNr: number;
    private _isStudentOrder: boolean;

    constructor(
        orderNr: number,
        isStudentOrder: boolean
    ) {
        this._orderNr = orderNr;
        this._isStudentOrder = isStudentOrder;
    }

    
    public get orderNr() : number {
        return this._orderNr;
    }
    
    addSeatReservation(ticket: MovieTicket): void {
        this._seatReservations.push(ticket);
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