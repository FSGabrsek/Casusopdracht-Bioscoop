import { writeFileSync } from "fs";
import { Order } from "../order.model";
import { ExportStrategy } from "./export.strategy";

export class JsonExportStrategy implements ExportStrategy {
    export(order: Order): void {
        writeFileSync(`./out/order.json`, JSON.stringify(order));
    }
}