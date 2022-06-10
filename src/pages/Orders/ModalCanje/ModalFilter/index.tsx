import React, { useState, useEffect } from 'react';
import { BsFilter } from 'react-icons/bs';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import styles from './styles.module.scss';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';

type Props = {};

const index = (props: Props) => {
	const [openModalCanje, setOpenModalCanje] = useState<boolean>(false);
	const handleCanje = () => {
		setOpenModalCanje(true);
		console.log('abiertooooo');
	};
	return (
		<div>
			<div onClick={handleCanje} className={styles['check-filter']}>
				<BsFilter></BsFilter>
			</div>
			<Modal
				openModal={openModalCanje}
				setOpenModal={setOpenModalCanje}
				title="Filtros"
				card={true}
			>
				<section className={styles['filters']}>
					<div className={styles['filters-separate']}>
						<div className={styles['column']}>
							<Input placeholder="tipo de operacion" />
							<Input placeholder="tipo de propiedad" />
							<Input placeholder="Region" />
							<Input placeholder="Comuna" />
							<Input placeholder="Ranking" />
						</div>
						<div className={styles['column']}>
							<Input placeholder="tipo de moneda" />
							{/* <div  className={styles['double']}>
							</div> */}
							<Input placeholder="Precio min" />
							<Input placeholder="Precio min" />
							<Input placeholder="Precio min" />
							<Input placeholder="Precio min" />
						</div>
					</div>
					<div className={styles['action']}></div>
				</section>
				<div className={styles['modal-actions']}>
					<div className={styles['cancel']}>
						<Button variant="outline">Canelar</Button>
					</div>
					<div className={styles['save']}>
						<Button variant="primary">Guardar</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default index;
