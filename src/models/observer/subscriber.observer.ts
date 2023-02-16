export default interface Subscriber<T> {
    next(event?: T): void;
}