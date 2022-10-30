import { LocalEditor } from '../components/LocalEditor';
import { ButtonsMenu } from '../components/buttons/ButtonsMenu';
import { useEffect } from 'react';
import { serverSidePropsMiddleware } from '../lib/api/middleware';
import { getNote } from '../lib/api/services/notes.service';

const NoteId = ({ note, isAuthenticated }) => {
	useEffect(() => {
		if (!note.inProgress) {
			localStorage.setItem('saved', note.content);
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

export const config = {
	runtime: "experimental-edge",
};

export const getServerSideProps = serverSidePropsMiddleware(async context => {
	// get note data by ID (query param)
	const { noteId } = context.params;
	let note;
	try {
		note = await getNote(noteId);
	} catch (e) {
		console.log(e);
	}
	if (!note) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	note = JSON.parse(JSON.stringify(note));
	return { props: { note } };
}, {});

