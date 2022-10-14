import { apiMiddleware } from '../../lib/api/middleware';

const handler = req => {
	return { a: 123 };
};

export default apiMiddleware({ post: handler }, {onSuccessStatus: 201});
