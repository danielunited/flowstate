import styles from './modal.module.css';

export const Modal = ({ children, shouldDisplayModal }) => {

	const render = () => {
		if (shouldDisplayModal) {
			return <section className={styles.modalContainer}>{children}</section>;
		} else {
			return null;
		}
	};
	return render();
};
