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
				<img src="/images/close.png" alt="סגירת מסך שמירה" onClick={closeModal} className={styles.closePopup}/>
				<h1>הפתק נשמר בהצלחה!</h1>
				<p>כל אחד עם הקישור יוכל לצפות בקישור, אך רק אתה תוכל לערוך אותו</p>
				<Link href={`/${noteId}`}>
					<a className={styles.goToNote}>מעבר לפתק</a>
				</Link>
			</div>
		</Modal>
	);
};
