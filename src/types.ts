export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export interface ICreateInvoice {
	sum: string;
	orderId: string | number;
	shopId: string;
	hookUrl?: string;
	failUrl?: string;
	successUrl?: string;
	expire?: number;
	customFields?: string;
	comment?: string;
}

export interface IGetInvoiceStatus {
	shopId: string;
	orderId: string | number;
	invoiceId: string;
}
