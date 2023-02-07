import { ExportStrategy } from "./export.strategy";

export class PlainTextExportStrategy implements ExportStrategy {
    export(): void {
        throw new Error("Method not implemented.");
    }
}