interface httpResponse<T = undefined> {
	message: string;
	status: number;
	data?: T;
}

export class HttpResponseMapper {
	toHttp<T>(response: httpResponse<T>) {
		return {
			message: response.message,
			status: response.status,
			data: response.data,
		};
	}
}
