import React, {useState} from 'react';
import styles from './styles.module.scss';
import { BiLocationPlus, BiArrowBack } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import IconsDescription from 'components/IconsDescription';
import Input from 'components/Input';
import { url } from 'inspector';

type Props = {};

const Details = (props: Props) => {
	const location: any = useLocation();
	const navigate = useNavigate();
	const [property, setProperty] = useState(location.state.property);

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
					<span>{property.title}</span>
					<span>
						<span className={styles['location-icon']}>
							<BiLocationPlus />
						</span>
						{property.city}
					</span>
				</div>
				<div className={styles['card-img']} style={{backgroundImage: `url(${property.imgUrl})`}}>
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
					consectetur adipisicing elit.
				</p>
				<div className={styles['card-price']}>
					<span>{property.price} USD</span>
				</div>
			</section>
		</section>
	);
};

export default Details;
