import { Order } from "./order.model";
import { JsonExportStrategy } from "./strategies/json-export.strategy";
import { StandardPriceStrategy } from "./strategies/standard-price.strategy";

export class StandardPlainTextOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StandardPriceStrategy(), new JsonExportStrategy());
    }
}