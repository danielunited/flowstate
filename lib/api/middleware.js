import { handleMongoConnection } from '../mongo/connection';

const baseMiddleware = async ({ useAuth = true, useDb = true }) => {
	if (useDb) {
		await handleMongoConnection();
	}
	if (useAuth) {
	} // TODO handle auth middleware
};

const apiMiddleware = (
	handler,
	{ useAuth, useDb, returnJson = true, onSuccessStatus = 200 } = {},
) => {
	return async (req, res) => {
		try {
			await baseMiddleware({ useAuth, useDb });
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

const serverSidePropsMiddleware = (handler, { useAuth, useDb }) => {
	return async context => {
		try {
			await baseMiddleware({ useAuth, useDb });
			const serverSidePropsResult = await handler(context);
			return serverSidePropsResult;
		} catch (e) {
			// TODO handle errors
			return { error: e };
		}
	};
};

const getHandlerFunctionByMethod = (handler, method) => {
	if (typeof handler === 'function') {
		return handler;
	}
	return handler[method.toLowerCase()];
};

module.exports = {
	apiMiddleware,
	serverSidePropsMiddleware,
};
