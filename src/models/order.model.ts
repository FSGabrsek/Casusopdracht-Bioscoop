import { TicketExportFormat } from "../enums/ticket-export-format.enum";
import { MovieTicket } from "./movie-ticket.model";

export class Order {
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

    }

    calculatePrice(): number {
        return -1;
    }

    export(exportFormat: TicketExportFormat): void {

    }
}