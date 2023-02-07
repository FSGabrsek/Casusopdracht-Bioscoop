import { Order } from "./order.model";
import { StandardPriceStrategy } from "./strategies/standard-price.strategy";

export class StandardOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StandardPriceStrategy());
    }
}