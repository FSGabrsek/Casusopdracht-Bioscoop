import { Order } from "./order.model";
import { JsonExportStrategy } from "./strategies/json-export.strategy";
import { StudentPriceStrategy } from "./strategies/student-price.strategy";

export class StudentPlainTextOrder extends Order {
    constructor(
        orderNr: number
    ) {
        super(orderNr, new StudentPriceStrategy(), new JsonExportStrategy());
    }
}