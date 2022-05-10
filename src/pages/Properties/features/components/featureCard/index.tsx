import React, { useState } from 'react';
import { BiEdit,BiDotsVertical, BiHome } from 'react-icons/bi';
import styles from './styles.module.scss';
import Button from 'components/Button';
import ModalEdit from '../modal/index';
type Props = {
	title: string;
};

const index = (props: Props) => {
	let [showModal, setModal] = useState(false);
	let [showForm, setForm] = useState(false);

	const toggleModal = () => {
		setForm(!showForm);
	};

	let Modal = () => {
		if (showModal) {
			return (
				<div
					onClick={() => setForm((showForm = !showForm))}
					className={styles['modal']}
				>
					<BiEdit size={24} className={styles['head']} />
					<span>Editar</span>
				</div>
			);
		} else {
			return <span></span>;
		}
	};
	let ModalForm = () => {
		if (showForm) {
			return <ModalEdit toggleModal={toggleModal} />;
		} else {
			return <span></span>;
		}
	};

	return (
		<section className={styles['feature']}>
			<div className={styles['head']}>
				<BiHome size={24} />
				<div className={styles['button-container']}>
					<Button
						onClick={() => setModal((showModal = !showModal))}
						type="button"
						variant="rounded"
					>
						<BiDotsVertical size={24} className={styles['head']} />
					</Button>
					<Modal />
				</div>
			</div>
			<div className={styles['feature-body']}>{props.title}</div>
			<ModalForm />
		</section>
	);
};
export default index;
