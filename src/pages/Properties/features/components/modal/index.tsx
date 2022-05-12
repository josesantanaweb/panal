import React from 'react';
import styles from './styles.module.scss';
import { BiX } from 'react-icons/bi';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

type Props = {
	toggleModal: () => void;
};

const index = (props: Props) => {
	let value = false;
	return (
		<section className={styles['modal']}>
			<div className={styles['modal-window']}>
				<div className={styles['modal-head']}>
					<span>Editar caracteristicas</span>
					<Button onClick={props.toggleModal} type="button" variant="rounded">
						<BiX className={styles['close']} size={24} />
					</Button>
					<span className={styles['separator']}></span>
				</div>
				<div className={styles['modal-body']}>
					<section className={styles['features']}>
						<span>Caracteristicas</span>
						<div className={styles['featureList']}>
							<Checkbox name="uno" label="Habitaciones" value={value} />
							<Checkbox name="uno" label="Superficie de casa" value={value} />
							<Checkbox name="uno" label="Recepcon final" value={value} />
							<Checkbox name="uno" label="casa" value={value} />
						</div>
					</section>
					<section className={styles['features']}>
						<span>Urbanizacion</span>
						<div className={styles['featureList']}>
							<Checkbox name="uno" label="Alcantarillado" value={value} />
							<Checkbox name="uno" label="tipo de agua" value={value} />
						</div>
					</section>
				</div>
				<div className={styles['modal-actions']}>
					<div className={styles['cancel']}>
						<Button onClick={props.toggleModal} variant="outline">
							Canelar
						</Button>
					</div>
					<div className={styles['save']}>
						<Button onClick={props.toggleModal}  variant="primary">
							Guardar
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default index;
