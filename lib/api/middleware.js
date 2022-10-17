import { handleMongoConnection } from '../mongo/connection';

export const apiMiddleware = (
	handler,
	{ useAuth = true, useDb = true, returnJson = true, onSuccessStatus = 200 } = {},
) => {
	return async (req, res) => {
		try {
			if (useDb) {
				await handleMongoConnection();
			}
			if (useAuth) {
			} // TODO handle auth middleware
			const handlerFunction = getHandlerFunctionByMethod(handler, req.method);
			if (!handlerFunction) {
				throw new Error('method not allowed'); // TODO handle method not allowed error
			}
			const result = await handlerFunction(req, res);
			if (returnJson) {
				res.status(onSuccessStatus).json(result);
			} else {
				res.status(onSuccessStatus).send(result);
			}
		} catch (e) {
			// TODO create error handler
			res.status(e.statusCode || 500).json({ error: e.message, code: e.code });
		}
	};
};

const getHandlerFunctionByMethod = (handler, method) => {
	if (typeof handler === 'function') {
		return handler;
	}
	return handler[method.toLowerCase()];
};
