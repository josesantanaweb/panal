import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
type Props = {};
import styles from './styles.module.scss';

const index = (props: Props) => {
	return (
		<div className={styles['content']}>
			<div>
				<BiArrowBack />
			</div>
			<div>Volver al listado</div>
		</div>
	);
};

export default index;
