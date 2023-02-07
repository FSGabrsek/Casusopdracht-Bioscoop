import { Order } from "./order.model";
import { PlainTextExportStrategy } from "./strategies/plaintext-export.strategy";
import { StandardPriceStrategy } from "./strategies/standard-price.strategy";

export class StandardPlainTextOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StandardPriceStrategy(), new PlainTextExportStrategy());
    }
}