import React from 'react';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { BiStar, BiDotsVertical, BiLocationPlus } from 'react-icons/bi';

type Props = {};

const index = (props: Props) => {
	return (
		<div className={styles['card-canje']}>
			<div className={styles['canje-pic']}>
				<figure></figure>
			</div>
			<div className={styles['canje-name']}>
				<span className={styles['tiltle']}>romario hause</span>
				<span className={styles['location']}>
					<BiLocationPlus></BiLocationPlus>
					Santiago de chile
				</span>
				<span>codigo 123</span>
			</div>
			<div className={styles['canje-price']}>
				<span>500 USD</span>
			</div>
			<div className={styles['canje-ranking']}>
				<span>Jose Perez</span>
				<div>
					<BiStar></BiStar>
					<BiStar></BiStar>
					<BiStar></BiStar>
					<BiStar></BiStar>
					<span className={styles['ranking']}>3.5</span>
				</div>
			</div>
			<div className={styles['canje-status']}>
				<Button>Ver Detalles</Button>
			</div>
			<div className={styles['canje-action']}>
				<span>
					<BiDotsVertical></BiDotsVertical>
				</span>
			</div>
		</div>
	);
};

export default index;
