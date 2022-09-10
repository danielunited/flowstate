import { LocalEditor } from '../components/LocalEditor';
import { FlowButton } from '../components/FlowButton';
import { SaveButton } from '../components/SaveButton';

const NoteId = () => {
	return (
		<div className="App">
			<LocalEditor />
			<div className="app-button-container">
				<FlowButton />
				<SaveButton />
				{/* TODO add future features below */}
				{/*<FocusPopup />*/}
			</div>
			{/*<Timer />*/}
		</div>
	);
};

export default NoteId;
