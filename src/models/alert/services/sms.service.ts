import MessagingService from "./message.service";

export default class SmsService implements MessagingService {
    format(content: string): string {
        return `<sms>${content}</sms>`
    }
    sendMessage(message: string): void {
        console.log(this.format(message));
    }
}