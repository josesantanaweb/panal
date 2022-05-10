import React from 'react';
import Card from './components/featureCard/index';
import styles from "./styles.module.scss";

type Props = {};

let featureList = [
	{ title: 'Bodega' },
	{ title: 'Terreno en construccion' },
	{ title: 'Estacionamiento' },
	{ title: 'Agricola' },
	{ title: 'Industrial' },
	{ title: 'Local comercial' },
	{ title: 'Sitio' },
	{ title: 'Oficina' },
	{ title: 'Casa' },
	{ title: 'Departamento' },
];

const index = (props: Props) => {
	return (
		<section className={styles['features-container']}>
			{featureList.map((name, key) => (
				<Card title={name.title} key={key} />
			))}
		</section>
	);
};

export default index;
