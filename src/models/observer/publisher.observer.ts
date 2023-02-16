import Subscriber from "./subscriber.observer";

export default interface Publisher<T> {
    subscribe(subscriber: Subscriber<T>): void;
    unsubscribe(subscriber: Subscriber<T>): void;
    publish(event: T): void;
}