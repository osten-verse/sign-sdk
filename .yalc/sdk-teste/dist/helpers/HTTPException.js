"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.HttpException = HttpException;
