export default class IllegalStateException extends Error {
    constructor(message?: any) {
        super(message);
        this.name = 'IllegalStateException';
    }
}