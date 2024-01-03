import { HttpMethod, IBaseResponse, ICreateInvoiceRequest, ICreateInvoiceResponse, IGetAvailableTariffs, IGetInvoiceStatusRequest, IGetInvoiceStatusResponse, IGetShopBalance } from './types';
export declare class LavaPay {
    private readonly secretKey;
    private readonly shopId;
    constructor(secretKey: string, shopId: string);
    private getSignature;
    /**
     * Sends a request to the specified route using the given HTTP method.
     *
     * @param {HttpMethod} method - The HTTP method to use for the request.
     * @param {string} route - The route to send the request to.
     * @param {Record<string, any>} data - The data to include in the request.
     * @return {Promise<T>} - A promise that resolves with the response data.
     */
    request<T>(method: HttpMethod, route: string, body: Record<string, any>): Promise<T>;
    /**
     * Creates a invoice.
     *
     * @param {ICreateInvoiceRequest} options - The invoice options.
     * @return {Promise<IBaseResponse<ICreateInvoiceResponse>>} The response of creating a invoice.
     */
    createInvoice(options: ICreateInvoiceRequest): Promise<IBaseResponse<ICreateInvoiceResponse>>;
    /**
     * Returns information about the status of the invoice
     *
     * @param {IGetInvoiceStatusRequest} options - The invoice info.
     * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
     */
    getInvoiveStatus(options: IGetInvoiceStatusRequest): Promise<IBaseResponse<IGetInvoiceStatusResponse>>;
    /**
     * Returns a list of payment methods
     *
     * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
     */
    getAvailableTariffs(): Promise<IBaseResponse<IGetAvailableTariffs[] | IGetAvailableTariffs>>;
    /**
     * Returns shop balance
     *
     * @return {Promise<IBaseResponse<IGetShopBalance>>} The response of get shop balance.
     */
    getShopBalance(): Promise<IBaseResponse<IGetShopBalance>>;
}
