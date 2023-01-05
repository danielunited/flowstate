const API_BASE_URL = "/api";

export const getNote = async id => {
	const res = await fetch(`${API_BASE_URL}/note/${id}`);
	const data = await res.json();
	return data;
};

export const createNote = async text => {
	const res = await fetch(`${API_BASE_URL}/note`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text }),
	});
	const { id, editKey } = await res.json();
	return { id, editKey };
};

export const updateNote = async ({ id, editKey, text }) =>
	fetch(`${API_BASE_URL}/note/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ editKey, text }),
	});
