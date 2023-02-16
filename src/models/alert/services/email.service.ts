import MessagingService from "./messaging.service";

export default class EmailService implements MessagingService {
    format(content: string): string {
        return `<email>${content}</email>`
    }
    sendMessage(message: string): void {
        this.format(message);
    }
}