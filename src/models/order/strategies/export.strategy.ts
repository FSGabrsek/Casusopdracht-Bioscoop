import { Order } from "../order.model";

export interface ExportStrategy {
    export(order: Order): void
}