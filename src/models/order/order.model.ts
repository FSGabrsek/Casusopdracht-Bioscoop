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

    calculatePrice(): number {
        const priceList: number[] = [];

        const alternatingDiscountDays = this._isStudentOrder ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4];
        const alternatingDiscount = this._isStudentOrder ? 1.00 : 1.00;
        const groupDiscountRequiredSize = this._isStudentOrder ? Infinity : 6;
        const groupDiscount = this._isStudentOrder ? 0.00 : 0.10;
        const premium = this._isStudentOrder ? 2 : 3;

        let applyAlternatingDiscount = false;
        this._seatReservations.forEach((reservation) => {
            let price = reservation.isPremiumTicket() ? reservation.price + premium : reservation.price;

            if (alternatingDiscountDays.includes(reservation.movieScreening.dateAndTime.getDay())) {
                if (applyAlternatingDiscount) {
                    price = (price * (1 - alternatingDiscount));
                }
                applyAlternatingDiscount = !applyAlternatingDiscount;
            } else {
                if (this._seatReservations.length >= groupDiscountRequiredSize) {
                    price = (price * (1 - groupDiscount));
                }
            }
            priceList.push(price);
        });

        const total = +priceList.reduce((partial, val) => partial + val, 0).toFixed(2);
        return total;
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