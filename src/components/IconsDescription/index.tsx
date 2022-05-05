import React from 'react';
import { BiLocationPlus, BiMove, BiCar, BiBath } from 'react-icons/bi';
import styles from './styles.module.scss';

type Props = {};

const index = (props: Props) => {
	return (
		<section className={styles['description-list']}>
			<div className={styles['description-item']}>
				<span className={styles['icon']}>
					<BiMove />
				</span>
				<span>10m</span>
			</div>
			<div className={styles['description-item']}>
				<span className={styles['icon']}>
					<BiLocationPlus />
				</span>
				<span>7m</span>
			</div>
			<div className={styles['description-item']}>
				<span className={styles['icon']}>
					<BiCar />
				</span>
				<span>02</span>
			</div>
			<div className={styles['description-item']}>
				<span className={styles['icon']}>
					<BiBath />
				</span>
				<span>02</span>
			</div>
			<div className={styles['description-item']}>
				<span className={styles['icon']}>
					<BiCar />
				</span>
				<span>01</span>
			</div>
		</section>
	);
};
export default index;
