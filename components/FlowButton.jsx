import brainImg from '/public/images/brain.png';
import { Button } from './UI/Button';

export const FlowButton = () => {
	const onClick = () => {};
	return <Button image={brainImg} imageAlt="מצב זרימה" text="הכנס לפלואו" onClick={onClick} />;
};
