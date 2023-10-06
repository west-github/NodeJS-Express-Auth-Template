export class HttpResponse<T> {
    private payload: T;
    private statusCode: number;
    // Other useful stuff to send frontend
    // timestamp
    // we might want to do logging
    // or something useful
    // its redundant for now

    constructor(payload: T, statusCode: number) {
        this.payload = payload;
        this.statusCode = statusCode;
    }
}

export class HttpError {
    private statusCode: number;
    private message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
