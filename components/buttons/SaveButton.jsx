import saveImg from '/public/images/save.png';
import { Button } from '../UI/Button';
import { apiReq } from '../../lib/utils/apiReq';
import { useRouter } from 'next/router';

export const SaveButton = () => {
	const router = useRouter();
	console.log("-> router", router);

	const onClick = async () => {
		const res = apiReq({
			url: '/api/notes',
			method: 'POST',
			data: {
				content: localStorage.getItem('saved'),
			},
		});
	};

	return <Button image={saveImg} imageAlt="שמירה" text="שמירת פתק" onClick={onClick} />;
};
