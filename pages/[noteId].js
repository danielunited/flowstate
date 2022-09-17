import { LocalEditor } from '../components/LocalEditor';
import { FlowButton } from '../components/buttons/FlowButton';
import { SaveButton } from '../components/buttons/SaveButton';
import { ButtonsMenu } from '../components/buttons/ButtonsMenu';

const NoteId = () => {
	return (
		<>
			<LocalEditor />
			<ButtonsMenu />
			{/*<Timer />*/}
		</>
	);
};

export default NoteId;
