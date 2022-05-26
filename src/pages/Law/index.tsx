import React from 'react';
import styles from './styles.module.scss';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

type Props = {};

const index = (props: Props) => {
	const navigate = useNavigate();

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
		</div>
	);
};

export default index;
