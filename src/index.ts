import { createHmac } from 'crypto';
import { HttpMethod, Type } from './types';
import axios from 'axios';
import { LavaError } from './errors';

export class LavaPay {
	constructor(private readonly secretKey: string) {}

	private getSignature(body: Record<string, any>) {
		return createHmac('sha256', this.secretKey).update(JSON.stringify(body)).digest('hex');
	}

	public async request<T>(method: HttpMethod, type: Type, route: any, body: Record<string, any>): Promise<T> {
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
}
