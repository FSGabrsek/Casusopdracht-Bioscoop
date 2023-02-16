import MessagingService from "./message.service";

export default class EmailService implements MessagingService {
    format(content: string): string {
        return `<email>${content}</email>`
    }
    sendMessage(message: string): void {
        console.log(this.format(message));
    }
}