import React from 'react';
import styles from './styles.module.scss';
import { BiLocationPlus, BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import IconsDescription from 'components/IconsDescription';
import Input from 'components/Input';

type Props = {};

const Details = (props: Props) => {
	const navigate = useNavigate();
	return (
		<section className={styles['details']}>
			<div className={styles['back']} onClick={() => navigate(-1)}>
				<div>
					<BiArrowBack />
				</div>
				<div>Volver al listado</div>
			</div>
			<div className={styles['details-message']}>
				<div className={styles['title']}>
					<span>¡Hola!</span>
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
			<section className={styles['details-card']}>
				<div className={styles['card-title']}>
					<span>Romario house</span>
					<span>
						<span className={styles['location-icon']}>
							<BiLocationPlus />
						</span>
						Santiago de Chile
					</span>
				</div>
				<div className={styles['card-img']}>
					<figure></figure>
				</div>
				<div className={styles['card-description']}>
					<IconsDescription />
				</div>

				<div className={styles['card-price']}>
					<span>50.000 USD</span>
				</div>
			</section>
		</section>
	);
};

export default Details;
