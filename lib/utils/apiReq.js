const URL_PREFIX = '';

export const apiReq = async ({ url, method, data, customConfig, errorHandler }) => {
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
		const res = await fetch(URL_PREFIX + url, config);
		if (res.ok === false) {
			errorHandler && errorHandler(res);
			return;
		}
		return res.json();
	} catch (error) {
		errorHandler && errorHandler(error);
	}
};
