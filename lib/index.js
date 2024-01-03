"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaPay = void 0;
const crypto_1 = require("crypto");
const types_1 = require("./types");
const axios_1 = require("axios");
const errors_1 = require("./errors");
class LavaPay {
    secretKey;
    shopId;
    constructor(secretKey, shopId) {
        this.secretKey = secretKey;
        this.shopId = shopId;
    }
    getSignature(body) {
        return (0, crypto_1.createHmac)('sha256', this.secretKey).update(JSON.stringify(body)).digest('hex');
    }
    /**
     * Sends a request to the specified route using the given HTTP method.
     *
     * @param {HttpMethod} method - The HTTP method to use for the request.
     * @param {string} route - The route to send the request to.
     * @param {Record<string, any>} data - The data to include in the request.
     * @return {Promise<T>} - A promise that resolves with the response data.
     */
    async request(method, route, body) {
        try {
            body.shopId = this.shopId;
            const { data } = await axios_1.default.request({
                method,
                url: `https://api.lava.ru/business/${route}`,
                params: method === types_1.HttpMethod.GET ? body : undefined,
                data: method === types_1.HttpMethod.POST ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Signature: this.getSignature(body),
                },
            });
            return data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                throw new errors_1.LavaError(JSON.stringify(error.response.data, undefined, 4));
            }
        }
    }
    /**
     * Creates a invoice.
     *
     * @param {ICreateInvoiceRequest} options - The invoice options.
     * @return {Promise<IBaseResponse<ICreateInvoiceResponse>>} The response of creating a invoice.
     */
    async createInvoice(options) {
        return this.request(types_1.HttpMethod.POST, 'invoice/create', options);
    }
    /**
     * Returns information about the status of the invoice
     *
     * @param {IGetInvoiceStatusRequest} options - The invoice info.
     * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
     */
    async getInvoiveStatus(options) {
        return this.request(types_1.HttpMethod.POST, 'invoice/status', options);
    }
    /**
     * Returns a list of payment methods
     *
     * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
     */
    async getAvailableTariffs() {
        return this.request(types_1.HttpMethod.POST, 'invoice/get-available-tariffs', {});
    }
    /**
     * Returns shop balance
     *
     * @return {Promise<IBaseResponse<IGetShopBalance>>} The response of get shop balance.
     */
    async getShopBalance() {
        return this.request(types_1.HttpMethod.POST, 'shop/get-balance', {});
    }
}
exports.LavaPay = LavaPay;
