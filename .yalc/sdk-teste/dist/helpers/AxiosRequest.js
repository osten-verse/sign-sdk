"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = require("axios");
const HTTPException_1 = require("./HTTPException");
const JWTToken_1 = require("./JWTToken");
class Request {
    constructor(publicKey, defaultUserId, secretKey, apiPath) {
        this.jwt = new JWTToken_1.JWTToken(publicKey, defaultUserId, secretKey);
        this.apiPath = apiPath;
    }
    async get(path, params, optional) {
        try {
            const userJWT = this.jwt.get(optional.userId);
            const result = await axios_1.default.get(`${this.apiPath}/${path}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userJWT}`,
                },
                params,
            });
            return result.data;
        }
        catch (cause) {
            throw new HTTPException_1.HttpException(cause.response.data.error, cause.response.data.statusCode);
        }
    }
    async post(path, body, optional) {
        try {
            const userJWT = this.jwt.get(optional.userId);
            const result = await axios_1.default.post(`${this.apiPath}/${path}`, body, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            return result.data;
        }
        catch (cause) {
            throw new HTTPException_1.HttpException(cause.response.data.error, cause.response.data.statusCode);
        }
    }
    async put(path, body, optional) {
        try {
            const userJWT = this.jwt.get(optional.userId);
            const result = await axios_1.default.put(`${this.apiPath}/${path}`, body, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            return result.data;
        }
        catch (cause) {
            throw new HTTPException_1.HttpException(cause.response.data.error, cause.response.data.statusCode);
        }
    }
    async delete(path, body, optional) {
        const userJWT = this.jwt.get(optional.userId);
        const result = await axios_1.default.delete(`${this.apiPath}/${path}`, {
            data: body,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userJWT}`,
            },
        });
        return result.data;
    }
}
exports.Request = Request;
