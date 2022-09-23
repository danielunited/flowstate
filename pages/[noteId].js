import { LocalEditor } from '../components/LocalEditor';
import { FlowButton } from '../components/buttons/FlowButton';
import { SaveButton } from '../components/buttons/SaveButton';
import { ButtonsMenu } from '../components/buttons/ButtonsMenu';
import { useEffect } from 'react';

const NoteId = ({ content, mostRecent, isAuthenticated }) => {
	useEffect(() => {
		if (mostRecent) {
			localStorage.setItem('saved', content);
		}
	}, []);

	return (
		<>
			<LocalEditor />
			<ButtonsMenu isAuthenticated={isAuthenticated} />
			{/*<Timer />*/}
		</>
	);
};

export default NoteId;

export async function getServerSideProps(context) {
	const { getNoteContent } = require('../lib/api/services/notes.service');
	// get note data by ID (query param)
	const { noteId } = context.params;
	const note = getNoteContent(noteId);
	if (!note) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	if (!note.mostRecent) {
		return {
			props: {
				mostRecent: note.mostRecent,
			},
		};
	}

	return { props: note };
}
