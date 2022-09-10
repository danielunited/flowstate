import Image from 'next/image';
import saveImg from '/public/images/save.png';

export const SaveButton = () => {
	return (
		<button className="app-button">
			<Image src={saveImg} alt="מצב זרימה" width="36" height="36" />
			<span className="app-button-tooltip">שמירת פתק</span>
		</button>
	);
};
