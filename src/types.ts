export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export interface IBaseResponse<T> {
	data: T | null;
	error?: any;
	status: number;
	status_check: boolean;
}

export interface ICreateInvoiceRequest {
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

export interface ICreateInvoiceResponse {
	id: string;
	amount: number;
	expired: string;
	status: number;
	shop_id: string;
	url: string;
	comment: string | null;
	fail_url: string | null;
	success_url: string | null;
	hook_url: string | null;
	custom_fields: string | null;
	merchantName: string | null;
	exclude_service: string[] | null;
	include_service: string[] | null;
}

export interface IGetInvoiceStatusRequest {
	shopId: string;
	orderId: string | number;
	invoiceId: string;
}

export interface IGetInvoiceStatusResponse {
	status: string;
	error_message?: any;
	id: string;
	shop_id: string;
	amount: number;
	expire: string;
	order_id: string;
	fail_url: string | null;
	success_url: string | null;
	hook_url: string | null;
	custom_fields: string | null;
	include_service: string[] | null;
}
