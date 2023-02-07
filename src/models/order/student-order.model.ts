import { Order } from "./order.model";
import { StudentPriceStrategy } from "./strategies/student-price.strategy";

export class StudentOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StudentPriceStrategy());
    }
}