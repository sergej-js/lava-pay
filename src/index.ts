import { createHmac } from 'crypto';
import {
	HttpMethod,
	IBaseResponse,
	ICreateInvoiceRequest,
	ICreateInvoiceResponse,
	IGetAvailableTariffs,
	IGetInvoiceStatusRequest,
	IGetInvoiceStatusResponse,
} from './types';
import axios from 'axios';
import { LavaError } from './errors';

export class LavaPay {
	constructor(
		private readonly secretKey: string,
		private readonly shopId: string,
	) {}

	private getSignature(body: Record<string, any>) {
		return createHmac('sha256', this.secretKey).update(JSON.stringify(body)).digest('hex');
	}

	/**
	 * Sends a request to the specified route using the given HTTP method.
	 *
	 * @param {HttpMethod} method - The HTTP method to use for the request.
	 * @param {string} route - The route to send the request to.
	 * @param {Record<string, any>} data - The data to include in the request.
	 * @return {Promise<T>} - A promise that resolves with the response data.
	 */
	public async request<T>(method: HttpMethod, route: string, body: Record<string, any>): Promise<T> {
		try {
			body = body.push({ shopId: this.shopId });
			const { data } = await axios.request({
				method,
				url: `https://api.lava.ru/business/${route}`,
				params: method === HttpMethod.GET ? body : undefined,
				data: method === HttpMethod.POST ? JSON.stringify(body) : undefined,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Signature: this.getSignature(body),
				},
			});

			return <T>data;
		} catch (error) {
			throw new LavaError(JSON.stringify(error.response.data, undefined, 4));
		}
	}

	/**
	 * Creates a invoice.
	 *
	 * @param {ICreateInvoiceRequest} options - The invoice options.
	 * @return {Promise<IBaseResponse<ICreateInvoiceResponse>>} The response of creating a invoice.
	 */
	public async createInvoice(options: ICreateInvoiceRequest): Promise<IBaseResponse<ICreateInvoiceResponse>> {
		return this.request<IBaseResponse<ICreateInvoiceResponse>>(HttpMethod.POST, 'invoice/create', options);
	}

	/**
	 * Returns information about the status of the invoice
	 *
	 * @param {IGetInvoiceStatusRequest} options - The invoice info.
	 * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
	 */
	public async getInvoiveStatus(options: IGetInvoiceStatusRequest): Promise<IBaseResponse<IGetInvoiceStatusResponse>> {
		return this.request<IBaseResponse<IGetInvoiceStatusResponse>>(HttpMethod.POST, 'invoice/status', options);
	}

	/**
	 * Returns a list of payment methods
	 *
	 * @return {Promise<IBaseResponse<IGetInvoiceStatusResponse>>} The response of get invoice status.
	 */
	public async getAvailableTariffs(): Promise<IBaseResponse<IGetAvailableTariffs[] | IGetAvailableTariffs>> {
		return this.request<IBaseResponse<IGetAvailableTariffs[] | IGetAvailableTariffs>>(
			HttpMethod.POST,
			'invoice/get-available-tariffs',
			{},
		);
	}
}
