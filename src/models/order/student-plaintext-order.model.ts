import { Order } from "./order.model";
import { PlainTextExportStrategy } from "./strategies/plaintext-export.strategy";
import { StudentPriceStrategy } from "./strategies/student-price.strategy";

export class StudentPlainTextOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StudentPriceStrategy(), new PlainTextExportStrategy());
    }
}