import { writeFileSync } from "fs";
import { Order } from "../order.model";
import { ExportStrategy } from "./export.strategy";

export class PlainTextExportStrategy implements ExportStrategy {
    export(order: Order): void {
        writeFileSync(`./out/order.txt`, JSON.stringify(order));
    }
}