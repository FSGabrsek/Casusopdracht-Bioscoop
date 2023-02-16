import MessagingService from "./messaging.service";

export default class WhatsappService implements MessagingService {
    format(content: string): string {
        return `<whatsapp>${content}</whatsapp>`
    }
    sendMessage(message: string): void {
        this.format(message);
    }
}