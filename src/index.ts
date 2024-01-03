import { createHmac } from 'crypto';
import { HttpMethod, ICreateInvoice, IGetInvoiceStatus } from './types';
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

	public async request<T>(method: HttpMethod, route: string, body: Record<string, any>): Promise<T> {
		try {
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

	public async createInvoice(options: ICreateInvoice) {
		return this.request<ICreateInvoice>(HttpMethod.POST, 'invoice/create', options);
	}

	public async getInvoiveStatus(options: IGetInvoiceStatus) {
		return this.request<IGetInvoiceStatus>(HttpMethod.POST, 'invoice/status', options);
	}
}
