import { LocalEditor } from '../components/LocalEditor';
import { ButtonsMenu } from "../components/buttons/ButtonsMenu";
import { FocusPopup } from '../components/focusPopup/FocusPopup';
import { Timer } from '../components/Timer';

const HomePage = () => {
	return (
		<>
			<LocalEditor />
			<ButtonsMenu />
			{/*<Timer />*/}
		</>
	);
};

export default HomePage;
