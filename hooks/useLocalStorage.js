import { useState, useEffect } from 'react';

export const useLocalStorage = () => {
	const [myLocalStorage, setMyLocalStorage] = useState(null);

	useEffect(() => {
		setMyLocalStorage(localStorage);
	}, []);

	return myLocalStorage;
};
