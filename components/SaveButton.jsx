import saveImg from '/public/images/save.png';
import { Button } from './UI/Button';
import { apiReq } from "../lib/utils/apiReq";


export const SaveButton = () => {
	const onClick = async () => {
		const res = apiReq({
			url: "/api/notes",
			method: "POST",
			data: {
				test: "My data!!"
			}
		})
	};
	return <Button image={saveImg} imageAlt="שמירה" text="שמירת פתק" onClick={onClick} />;
};
