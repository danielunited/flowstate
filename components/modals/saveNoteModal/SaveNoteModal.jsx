import { Modal } from '../Modal';
import Link from 'next/link';
import styles from '../modal.module.css';

export const SaveNoteModal = ({ shouldDisplayModal, noteId }) => {
	return (
		<Modal shouldDisplayModal={shouldDisplayModal}>
			<div className={styles.saveNoteModal}>
				<p>הפתק נשמר בהצלחה!</p>
				<Link href={`/${noteId}`}>
					<a>ניתן לגשת לפתק בלחיצה כאן</a>
				</Link>
			</div>
		</Modal>
	);
};
