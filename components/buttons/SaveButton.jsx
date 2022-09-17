import saveImg from '/public/images/save.png';
import { Button } from '../UI/Button';
import { apiReq } from '../../lib/utils/apiReq';
import { useRouter } from 'next/router';

export const SaveButton = () => {
	const router = useRouter();

	const createNote = async () => {
		const res = await apiReq({
			url: '/api/notes',
			method: 'POST',
			data: {
				content: localStorage.getItem('saved'),
			},
		});
	};

	const updateExistingNote = async () => {
		const res = await apiReq({
			url: `/api/notes/${router.query.noteId}`,
			method: 'PATCH',
			data: {
				content: localStorage.getItem('saved'),
			},
		});
	};

	const onClick = async () => {
		if (router.pathname === '/') {
			createNote();
		} else {
			updateExistingNote();
		}
	};

	return <Button image={saveImg} imageAlt="שמירה" text="שמירת פתק" onClick={onClick} />;
};
