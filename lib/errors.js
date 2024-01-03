"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaError = void 0;
class LavaError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LavaError';
    }
}
exports.LavaError = LavaError;
