import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { FaGreaterThan } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Table from './Table';

type Props = {};

const index = (props: Props) => {
	const navigate = useNavigate();
	const [openModal1, setOpen1] = useState<boolean>(true);
	const [openModal2, setOpen2] = useState<boolean>(false);
	const [openModal3, setOpen3] = useState<boolean>(false);
	const [openModal4, setOpen4] = useState<boolean>(false);
	const [openModal5, setOpen5] = useState<boolean>(false);
	const handleOpen1 = () => (openModal1 ? setOpen1(false) : setOpen1(true));
	const handleOpen2 = () => (openModal2 ? setOpen2(false) : setOpen2(true));
	const handleOpen3 = () => (openModal3 ? setOpen3(false) : setOpen3(true));
	const handleOpen4 = () => (openModal4 ? setOpen4(false) : setOpen4(true));
	const handleOpen5 = () => (openModal5 ? setOpen5(false) : setOpen5(true));

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
					<div className={styles['acordion-head']} onClick={handleOpen1}>
						<span className={openModal1 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>
							Ingreso operaciones a servicios
						</div>
					</div>
					<div className={!openModal1 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>

				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen2}>
						<span className={styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Correo de bienvenida</div>
					</div>
					<div className={!openModal2 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>

				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen3}>
						<span className={styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>
							Etapa promesa e instucciones
						</div>
					</div>
					<div className={!openModal3 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>

				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen4}>
						<span className={styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Estudio de titulo</div>
					</div>
					<div className={!openModal4 ? styles['hidden'] : ''}>
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
