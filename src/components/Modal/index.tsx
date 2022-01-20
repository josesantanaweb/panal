import React from 'react';
import { BiX } from 'react-icons/bi';

import styles from "./styles.module.scss";
import {ModalProps} from "./types";

const Modal:React.FC<ModalProps> = ({openModal, setOpenModal, children, title}) => {

	const modalClasses = [
		styles.modal,
		openModal ? styles['is-open'] : "",
	].join(' ');

	const modalContentClasses = [
		styles['modal-content'],
		openModal ? styles['is-open'] : "",
	].join(' ');

	const handleClose = () => setOpenModal(false);

	return (
		<div className={styles.add}>
			<div className={modalClasses}>
				<div className={modalContentClasses}>
					<div className={styles["modal-header"]}>
						<h3>{title}</h3>
						<span onClick={handleClose}><BiX/></span>
					</div>
					{children}
				</div>
			</div>
		</div>
	);

};

export default Modal;
