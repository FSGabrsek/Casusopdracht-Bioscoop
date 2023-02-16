import MessagingService from "./message.service";

export default class WhatsappService implements MessagingService {
    format(content: string): string {
        return `<whatsapp>${content}</whatsapp>`
    }
    sendMessage(message: string): void {
        console.log(this.format(message));
    }
}