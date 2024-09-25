"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const AxiosRequest_1 = require("../helpers/AxiosRequest");
class Routers extends AxiosRequest_1.Request {
    constructor(publicKey, defaultUserId, secretKey, apiPath) {
        super(publicKey, defaultUserId, secretKey, apiPath);
    }
    async listEnvelope(params, options) {
        return this.get('envelope', {
            filters: params?.query.filters.stringify().replace('filters=', ''),
            sortBy: params?.query.sortBy.stringify().replace('sortBy=', ''),
            includes: params?.includes,
            page: params?.page,
            pageSize: params?.pageSize,
        }, options);
    }
    async getEnvelopeById(params, options) {
        return this.get('envelope', {
            filters: params?.query.filters.stringify().replace('filters=', ''),
        }, options);
    }
    async createEnvelope(body, userId) {
        return this.post('envelope', body, { userId });
    }
    async closeEnvelope(body, userId) {
        return this.put('envelope/close', body, { userId });
    }
    async cancelEnvelope(body, userId) {
        return this.put('envelope/cancel', body, { userId });
    }
    async createAndRemoveDocument(method, body, userId) {
        return this.post(`envelope/${method}/document`, body, { userId });
    }
    async listDocument(params, options) {
        return this.get('documents', {
            filters: params?.query.filters.stringify().replace('filters=', ''),
            sortBy: params?.query.sortBy.stringify().replace('sortBy=', ''),
            includes: params?.includes,
            page: params?.page,
            pageSize: params?.pageSize,
        }, options);
    }
    async createDocument(body, userId) {
        return this.post('documents', body, { userId });
    }
    async createEnvelopeSigner(body, userId) {
        return this.post('envelope-signer', body, { userId });
    }
    async deleteEnvelopeSigner(body, userId) {
        return this.delete('envelope-signer', body, { userId });
    }
    async resendNotification(body, userId) {
        return this.post('envelope-signer/resend-notification', body, { userId });
    }
    async createTag(body, userId) {
        return this.post('tags', body, { userId });
    }
    async deleteTag(body, userId) {
        return this.delete('tags', body, { userId });
    }
}
exports.Routers = Routers;
