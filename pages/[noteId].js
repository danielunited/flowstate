import { LocalEditor } from '../components/LocalEditor';
import { ButtonsMenu } from '../components/buttons/ButtonsMenu';
import { useEffect } from 'react';
import { serverSidePropsMiddleware } from '../lib/api/middleware';
import { extractCookie } from '../lib/utils/auth';
const { getNoteAndAuthenticateUser } = require('../lib/api/services/notes.service');

const NoteId = ({ note, isAuthenticated }) => {
	useEffect(() => {
		if (!note.inProgress) {
			localStorage.setItem('saved', note.content);
		}
	}, []);

	return (
		<>
			<LocalEditor readOnly={!isAuthenticated} />
			<ButtonsMenu isAuthenticated={isAuthenticated} />
			{/*<Timer />*/}
		</>
	);
};

export default NoteId;

export const getServerSideProps = serverSidePropsMiddleware(async context => {
	const { noteId } = context.params;
	const { token } = context.req.cookies;
	const userData = extractCookie(token);
	let { note, isAuthenticated } = await getNoteAndAuthenticateUser(
		noteId,
		userData.userId,
		userData.accessToken,
	);
	if (!note) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	note = JSON.parse(JSON.stringify(note));
	return { props: { note, isAuthenticated } };
}, {});
