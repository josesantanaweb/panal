import React, { useRef } from 'react';
import { BiX } from 'react-icons/bi';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import Modal from 'react-modal';

interface ModalProps {
	setModal: any;
	modal: boolean;
	title: string;
	size?: string;
}

const ModalCenter: React.FC<ModalProps> = ({
	modal,
	setModal,
	children,
	title,
	size
}) => {
	const ref = useRef(null);

	// Close modal
	const handleClose = () => setModal(false);

	// Close modal wheen click outside
	const handleClickOutside = () => setModal(false);

	useOnClickOutside(ref, handleClickOutside);

	return (
		<Modal
			isOpen={modal}
			className="modal-center"
			overlayClassName="modal-center-mask"
			contentLabel="Example Modal">
			<div className="modal-center-header">
				<h3 className="modal-center-title">{title}</h3>
				<span className="modal-center-close" onClick={handleClose}>
					<BiX />
				</span>
			</div>
			{children}
		</Modal>
	);
};

export default ModalCenter;
