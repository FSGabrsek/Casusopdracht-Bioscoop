import Subscriber from "../observer/subscriber.observer";
import MessagingService from "./services/messaging.service";

export default class AlertManager implements Subscriber<string> {
    private _messagingService: MessagingService;

    constructor(
        messagingService: MessagingService
    ) {
        this._messagingService = messagingService
    }

    next(event: string = 'an update has occured'): void {
        this._messagingService.sendMessage(event);
    }
}