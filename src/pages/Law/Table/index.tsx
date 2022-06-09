import React from 'react';
import styles from './styles.module.scss';
import { BiEdit, BiListUl, BiTrashAlt } from 'react-icons/bi';

type Props = {};

const index = (props: Props) => {
	return (
		<div className={styles['table-container']}>
			<table className={styles.table}>
				<thead>
					<tr className={styles['table-head']}>
						<th>Operacion</th>
						<th>Registro</th>
						<th>Fecha inicio</th>
						<th>Fecha fin</th>
						<th>Entrega</th>
						<th>Estado</th>
						<th></th>
					</tr>
				</thead>

				<tbody className={styles['table-body']}>
					<tr>
						<td>Redaccion</td>
						<td>
							<BiListUl />
						</td>
						<td>
							<span className={`${styles['table-status']} ${styles.admin}`}>
								Ene. 01
							</span>
						</td>
						<td>
							{' '}
							<span className={`${styles['table-status']} ${styles.admin}`}>
								Ene. 01
							</span>
						</td>
						<td className={styles['table-color-item']}>
							<span className={styles['table-color']}>Hecho</span>
						</td>
						<td className={styles['table-color-item-warning']}>
							<span className={styles['table-color']}>En plazo</span>
						</td>
						<td>
							<span className={styles['table-color']}>Ver detalles</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default index;
