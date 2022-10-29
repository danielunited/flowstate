import { useState } from 'react';

export const useForceUpdate = () => {
	const [render, setRender] = useState();

	const forceUpdate = () => {
		setRender(!render);
	};

	return forceUpdate;
};
