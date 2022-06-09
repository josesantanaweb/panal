import React from 'react';

import styles from './styles.module.scss';

const Info = () => {
	return (
		<section className={styles['section__info']}>
			<div className={styles['content-info']}>
				<img
					src="https://res.cloudinary.com/panal/image/upload/v1654530715/Media-panal/Dise%C3%B1o_sin_t%C3%ADtulo_4_1_o1jkw0.png"
					alt="img-panal-info"
					className={styles['img-info']}
					style={{ width: 'auto', margin: '1.2rem 0' }}
				/>
			</div>
			<div>
				<h2>Lörem ipsum nen prest iligen. Besam sas.Egosk sende oråk</h2>
				<p>
					Lorem ipsum niligt autoradeipres att karen.Dogt pixlig
					cyberhygien.Jovis jod.Kontranat resen som våns. Mikrosetrebel
					receptmotionär.
				</p>
			</div>
		</section>
	);
};

export default Info;
