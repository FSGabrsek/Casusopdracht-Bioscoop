export default interface MessagingService {
    format(content: string): string;
    sendMessage(message: string): void;
}