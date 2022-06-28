import React, { useRef } from 'react';
import { BiX } from 'react-icons/bi';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';

interface ModalProps {
	setModal: any;
	modal: boolean;
	title: string;
	size?: string;
}

const Modal: React.FC<ModalProps> = ({
	modal,
	setModal,
	children,
	title,
	size,
}) => {
	const ref = useRef(null);

	const modalMaskClasses = classNames({
		'modal-mask': true,
		'modal-open': modal,
	});

	const modalClasses = classNames({
		modal: true,
		'modal-lg': size === 'lg',
		'modal-open': modal,
	});

	// Close modal
	const handleClose = () => setModal(false);

	// Close modal wheen click outside
	const handleClickOutside = () => setModal(false);

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className={modalMaskClasses}>
			<div className={modalClasses} ref={ref}>
				<div className="modal-header">
					<h3 className="modal-title">{title}</h3>
					<span className="modal-close" onClick={handleClose}>
						<BiX />
					</span>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
