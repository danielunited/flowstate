const URL_PREFIX = '';

export const apiReq = async ({ url, method, data, queryParams, customConfig, errorHandler }) => {
	try {
		let config = {};
		if (!customConfig) {
			config = {
				method,
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}
		config.body = data && JSON.stringify(data);
		let reqUrl = URL_PREFIX + url;
		if (queryParams) {
			const query = new URLSearchParams(queryParams).toString();
			reqUrl = reqUrl + "?" + query
		}
		const res = await fetch(reqUrl, config);
		if (res.ok === false) {
			errorHandler && errorHandler(res);
			return;
		}
		return res.json();
	} catch (error) {
		errorHandler && errorHandler(error);
	}
};
