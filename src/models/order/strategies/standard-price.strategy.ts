import { MovieTicket } from "../../movie-ticket.model";
import { PriceStrategy } from "./price.strategy";

export class StandardPriceStrategy implements PriceStrategy {
    calculatePrice(reservations: MovieTicket[]): number {
        const priceList: number[] = [];

        const alternatingDiscountDays = [1, 2, 3, 4];
        const alternatingDiscount = 1.00;
        const groupDiscountRequiredSize = 6;
        const groupDiscount = 0.10;
        const premium = 3;

        let applyAlternatingDiscount = false;
        reservations.forEach((reservation) => {
            let price = reservation.isPremiumTicket() ? reservation.price + premium : reservation.price;

            if (alternatingDiscountDays.includes(reservation.movieScreening.dateAndTime.getDay())) {
                if (applyAlternatingDiscount) {
                    price = (price * (1 - alternatingDiscount));
                }
                applyAlternatingDiscount = !applyAlternatingDiscount;
            } else {
                if (reservations.length >= groupDiscountRequiredSize) {
                    price = (price * (1 - groupDiscount));
                }
            }
            priceList.push(price);
        });

        const total = +priceList.reduce((partial, val) => partial + val, 0).toFixed(2);
        return total;
    }
}