import saveImg from '/public/images/save.png';
import { Button } from './UI/Button';

export const SaveButton = () => {
	const onClick = () => {};
	return <Button image={saveImg} imageAlt="שמירה" text="שמירת פתק" onClick={onClick} />;
};
