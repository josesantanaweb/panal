import React, { useState } from 'react';
import { BiCog, BiEdit, BiHomeSmile, BiTrashAlt } from 'react-icons/bi';
import styles from './styles.module.scss';
import Button from 'components/Button';

type Props = {
	title: string;
};

const index = (props: Props) => {
	let [showModal, setModal] = useState(false);
	let Modal = () => {
		if (showModal) {
			return (
				<div className={styles['modal']}>
					<BiEdit size={24} className={styles['head']} />
					<span>Editar</span>
				</div>
			);
		} else {
			return <span></span>;
		}
	};
	return (
		<section className={styles['feature']}>
			<div className={styles['head']}>
				<BiHomeSmile size={24} />
				<Button
					onClick={() => setModal((showModal = !showModal))}
					type="button"
					variant="rounded"
				>
					<BiEdit size={24} className={styles['head']} />
					<Modal />
				</Button>
			</div>
			<div className={styles['feature-body']}>{props.title}</div>
		</section>
	);
};
export default index;
