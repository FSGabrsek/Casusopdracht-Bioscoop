import { MovieTicket } from "../../movie-ticket.model";
import { PriceStrategy } from "./price.strategy";

export class StudentPriceStrategy implements PriceStrategy {
    calculatePrice(reservations: MovieTicket[]): number {
        const priceList: number[] = [];

        const alternatingDiscountDays = [0, 1, 2, 3, 4, 5, 6];
        const alternatingDiscount = 1.00;
    
        const premium =  2;

        let applyAlternatingDiscount = false;
        reservations.forEach((reservation) => {
            let price = reservation.isPremiumTicket() ? reservation.price + premium : reservation.price;

            if (alternatingDiscountDays.includes(reservation.movieScreening.dateAndTime.getDay())) {
                if (applyAlternatingDiscount) {
                    price = (price * (1 - alternatingDiscount));
                }
                applyAlternatingDiscount = !applyAlternatingDiscount;
            }
            priceList.push(price);
        });

        const total = +priceList.reduce((partial, val) => partial + val, 0).toFixed(2);
        return total;
    }
}