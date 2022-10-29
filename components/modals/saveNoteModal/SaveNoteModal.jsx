import { Modal } from '../Modal';
import Link from 'next/link';
import styles from '../modal.module.css';
import { Button } from '../../UI/Button';
import { useRouter } from 'next/router';

export const SaveNoteModal = ({ shouldDisplayModal, setShouldDisplayModal, noteId }) => {
	const router = useRouter();

	const closeModal = () => {
		localStorage.setItem('saved', '');
		router.reload();
	};

	return (
		<Modal shouldDisplayModal={shouldDisplayModal}>
			<div className={styles.saveNoteModal}>
				<p>הפתק נשמר בהצלחה!</p>
				<Link href={`/${noteId}`}>
					<a>ניתן לגשת לפתק בלחיצה כאן</a>
				</Link>
				<p>לאחר לחיצה על אישור התוכן בעמוד זה ימחק</p>
				<Button onClick={closeModal} text="אישור" buttonClassName={styles.submitButton} />
			</div>
		</Modal>
	);
};
