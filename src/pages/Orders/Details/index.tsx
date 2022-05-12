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
				<p className={styles['card-description-text']}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
					consequuntur delectus magnam repellat id aut sapiente quia veniam at
					sint, labore itaque deserunt inventore perspiciatis dolores
					voluptatibus assumenda eligendi sed? Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quos consequuntur delectus magnam
					repellat id aut sapiente quia veniam at sint, labore itaque deserunt
					inventore perspiciatis dolores voluptatibus assumenda eligendi
					sed?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
					consequuntur delectus magnam repellat id aut sapiente quia veniam at
					sint, labore itaque deserunt inventore perspiciatis dolores
					voluptatibus assumenda eligendi sed?Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quos consequuntur delectus magnam
					repellat id aut sapiente quia veniam at sint, labore itaque deserunt
					inventore perspiciatis dolores voluptatibus assumenda eligendi
					sed?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
					consequuntur delectus magnam repellat id aut sapiente quia veniam at
					sint, labore itaque deserunt inventore perspiciatis dolores
					voluptatibus assumenda eligendi sed?Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quos consequuntur delectus magnam
					repellat id aut sapiente quia veniam at sint, labore itaque deserunt
					inventore perspiciatis dolores voluptatibus assumenda eligendi
					sed?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
					consequuntur delectus magnam repellat id aut sapiente quia veniam at
					sint, labore itaque deserunt inventore perspiciatis dolores
					voluptatibus assumenda eligendi sed?
				</p>
				<Signature />
				<div className={styles['card-price']}>50.000 USD</div>
			</section>
			<section className={styles['inputs']}>
				<div className={styles['input-container']}>
					<span>Datos del Ejecutivo</span>
					<Input value="pedro perez" />
				</div>
				<div className={styles['input-container']}>
					<span>Fecha de la visita</span>
					<Input placeholder="Fecha" />
				</div>
			</section>
		</section>
	);
};

const Signature = (props: Props) => {
	return (
		<div>
			<section className={styles['signature']}>
				<div className={styles['signature-box']}>
					<div className={styles['name']}>Integral Queen</div>
					<span>Integralqueen@unnel.com</span>
					<span>0231321321 | 41321321</span>
				</div>
				<div className={styles['signature-box']}>
					<div className={styles['name']}>Daniel vera</div>
					<span>0231321321 | 41321321</span>
				</div>
			</section>
			<div className={styles['footer-signature']}>
				<span>UNNE</span>
				<span>Lorem ipsum dolor sit.</span>
				<span>https://unne.cl</span>
			</div>
		</div>
	);
};

export default Details;
