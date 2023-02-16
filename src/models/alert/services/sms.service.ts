import MessagingService from "./message.service";

export default class SmsService implements MessagingService {
    format(content: string): string {
        return `<sms>${content}</sms>`
    }
    sendMessage(message: string): void {
        this.format(message);
    }
}