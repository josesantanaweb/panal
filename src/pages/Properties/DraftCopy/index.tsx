import React from 'react';
import styles from './styles.module.scss';
import { BiError } from 'react-icons/bi';
import Button from 'components/Button';

type Props = {};

let draftList = [{ type: '', description: '' }];

const Draft = () => {
	return (
		<div className={styles['draft-item']}>
			<div className={styles['draft-title']}>
				<div className={styles['icon']}>
					<BiError size={24} />
				</div>
				<span>Usted tiene borradores de propiedades</span>
			</div>
			<div className={styles['draft-content']}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium
				voluptate quis commodi repudiandae molestias nihil perferendis harum
				vel. Temporibus sint maxime praesentium sed totam quas odio voluptatum
				nulla corporis.
			</div>
			<div className={styles['draft-actions']}>
				<div className={styles['cancel']}>
					<Button variant="outline">Canelar</Button>
				</div>
				<div className={styles['save']}>
					<Button variant="primary">Guardar</Button>
				</div>
			</div>
		</div>
	);
};

const index = (props: Props) => {
	return (
		<section className={styles['draft-container']}>
			<div className={styles['draft-group']}>
				<div className={styles['draft-day']}>
					(Borrador guardado) Martes, 15 de marzo de 2022
				</div>
				<Draft />
				<Draft />
			</div>
		</section>
	);
};

export default index;
