"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTToken = void 0;
const jwt = require('jsonwebtoken');
class JWTToken {
    constructor(publicKey, defaultUserId, secretKey) {
        this.defaultTokens = {};
        this.defaultUserId = defaultUserId;
        this.publicKey = publicKey;
        this.secretKey = secretKey;
    }
    generate(userId, time) {
        const payload = {
            publicKey: this.publicKey,
            moreInfo: { userId },
        };
        const options = time === '5m' ? { expiresIn: '5m' } : {};
        return jwt.sign(payload, this.secretKey, options);
    }
    get(userId) {
        const id = userId || this.defaultUserId;
        if (this.defaultTokens[id])
            return this.defaultTokens[id];
        this.defaultTokens[id] = this.generate(this.defaultUserId, 'notExpired');
        return this.defaultTokens[id];
    }
}
exports.JWTToken = JWTToken;
