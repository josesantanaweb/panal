import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Table from './Table';

type Props = {};

const index = (props: Props) => {
	const navigate = useNavigate();
	const [openModal, setOpen] = useState<boolean>(false);
	const handleOpen = () => (openModal ? setOpen(false) : setOpen(true));

	return (
		<div>
			<div className={styles['back']} onClick={() => navigate(-1)}>
				<div>
					<BiArrowBack />
				</div>
				<div>Volver al listado</div>
			</div>
			<div className={styles['details-message']}>
				<div className={styles['text']}>
					<div className={styles['title']}>
						<span>Servicios legales</span>
					</div>
					<div>
						<p className={styles['content']}>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
							quaerat fuga reiciendis tempora totam assumenda laboriosam, sequi
							aspernatur pariatur asperiores quo atque aliquid praesentium fugit
							impedit nisi repellat id! Est.
						</p>
					</div>
				</div>
				<div className={styles['button']}>
					<Button>Ver Detalles</Button>
				</div>
			</div>

			<section>
				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen}>
						<BiArrowBack />
						<div className={styles['acordion-title']}>
							Ingreso operaciones a servicios
						</div>
					</div>
					<div className={!openModal ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>

				<div></div>
				<div></div>
				<div></div>
			</section>
		</div>
	);
};

export default index;
