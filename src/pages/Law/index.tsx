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
	const [openModal6, setOpen6] = useState<boolean>(false);
	const [openModal7, setOpen7] = useState<boolean>(false);
	const [openModal8, setOpen8] = useState<boolean>(false);
	const [openModal9, setOpen9] = useState<boolean>(false);
	const handleOpen1 = () => (openModal1 ? setOpen1(false) : setOpen1(true));
	const handleOpen2 = () => (openModal2 ? setOpen2(false) : setOpen2(true));
	const handleOpen3 = () => (openModal3 ? setOpen3(false) : setOpen3(true));
	const handleOpen4 = () => (openModal4 ? setOpen4(false) : setOpen4(true));
	const handleOpen5 = () => (openModal5 ? setOpen5(false) : setOpen5(true));
	const handleOpen6 = () => (openModal6 ? setOpen6(false) : setOpen6(true));
	const handleOpen7 = () => (openModal7 ? setOpen7(false) : setOpen7(true));
	const handleOpen8 = () => (openModal8 ? setOpen8(false) : setOpen8(true));
	const handleOpen9 = () => (openModal9 ? setOpen9(false) : setOpen9(true));

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
						<span className={openModal2 ? styles['rotate'] : styles['icon']}>
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
						<span className={openModal3 ? styles['rotate'] : styles['icon']}>
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
						<span className={openModal4 ? styles['rotate'] : styles['icon']}>
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

				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen5}>
						<span className={openModal5 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Etapa compra venta</div>
					</div>
					<div className={!openModal5 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>

				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen6}>
						<span className={openModal6 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Etapa compra venta</div>
					</div>
					<div className={!openModal6 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>
				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen7}>
						<span className={openModal7 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>
							Etapa inscripción CBR
						</div>
					</div>
					<div className={!openModal7 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>
				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen8}>
						<span className={openModal8 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Etapa de pagos</div>
					</div>
					<div className={!openModal8 ? styles['hidden'] : ''}>
						<div className={styles['acordion-contenedor']}>
							<Table></Table>
						</div>
					</div>
				</div>
				<div className={styles['acordion-item']}>
					<div className={styles['acordion-head']} onClick={handleOpen9}>
						<span className={openModal9 ? styles['rotate'] : styles['icon']}>
							<FaGreaterThan />
						</span>
						<div className={styles['acordion-title']}>Entrega de propiedad</div>
					</div>
					<div className={!openModal9 ? styles['hidden'] : ''}>
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
