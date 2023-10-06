"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.HttpResponse = void 0;
class HttpResponse {
    // Other useful stuff to send frontend
    // timestamp
    // we might want to do logging
    // or something useful
    // its redundant for now
    constructor(payload, statusCode) {
        this.payload = payload;
        this.statusCode = statusCode;
    }
}
exports.HttpResponse = HttpResponse;
class HttpError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.HttpError = HttpError;
