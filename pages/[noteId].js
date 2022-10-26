import { LocalEditor } from '../components/LocalEditor';
import { FlowButton } from '../components/buttons/FlowButton';
import { SaveButton } from '../components/buttons/SaveButton';
import { ButtonsMenu } from '../components/buttons/ButtonsMenu';
import { useEffect } from 'react';
import { serverSidePropsMiddleware } from '../lib/api/middleware';

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

// export const getServerSideProps = serverSidePropsMiddleware(async context => {
// 	// get note data by ID (query param)
// 	const { noteId } = context.params;
// 	let note;
// 	try {
// 		note = await getNote(noteId);
// 		console.log('-> note', note);
// 	} catch (e) {
// 		console.log('\n\nxxxxx\n\n');
// 		console.log(e);
// 	}
// 	console.log('-> note', note);
// 	if (!note) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}
// 	// if (!note.mostRecent) {
// 	// 	return {
// 	// 		props: {
// 	// 			mostRecent: note.mostRecent,
// 	// 		},
// 	// 	};
// 	// }
//
// 	return { props: note };
// }, {});
const getServerSideProps = serverSidePropsMiddleware(() => {
	return {props: {}}
}, {})
console.log("-> getServerSideProps", getServerSideProps);

// export async function getServerSideProps(context) {
// 	// get note data by ID (query param)
// 	const { noteId } = context.params;
// 	let note;
// 	try {
// 		note = await getNote(noteId);
// 		console.log("-> note", note);
// 	} catch (e) {
// 		console.log('\n\nxxxxx\n\n');
// 		console.log(e);
// 	}
// 	console.log('-> note', note);
// 	if (!note) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}
// 	// if (!note.mostRecent) {
// 	// 	return {
// 	// 		props: {
// 	// 			mostRecent: note.mostRecent,
// 	// 		},
// 	// 	};
// 	// }
//
// 	return { props: note };
// }
