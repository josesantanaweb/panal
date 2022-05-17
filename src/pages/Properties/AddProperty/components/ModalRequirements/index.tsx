import React from 'react';
import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './styles.module.scss';
import Input from 'components/Input';

type Props = {
	openModal: boolean;
	setOpenModal: any;
};

const index = (props: Props) => {
	const INITIAL_VALUES = {};
	const onSubmit = function name(params: any) {};
	return (
		<Modal
			openModal={props.openModal}
			setOpenModal={props.setOpenModal}
			title="Generar orden de visita"
		>
			{
				<section>
					<Formik
						initialValues={INITIAL_VALUES}
						// validationSchema={validationSchema.addProperty}
						onSubmit={onSubmit}
					>
						{({ errors, touched, isValid, dirty }) => (
							<Form>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										cedula de identidad o pasaporte
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										<span>Renta igual o superior a </span>
										<Field
											className={styles['check-input']}
											type="text"
											name="observations.publicTitle"
											placeholder="0"
											component={Input}
										/>
										<span>veces monto del arriendo</span>
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										Informe de arriendo dicom
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										<span>ultimas</span>
										<Field
											className={styles['check-input']}
											type="text"
											name="observations.publicTitle"
											placeholder="0"
											component={Input}
										/>
										<span>liquidaciones de sueldo</span>
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										cedula de identidad o pasaporte
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										cedula de identidad o pasaporte
									</div>
								</div>
								<div className={styles['check-element']}>
									<Field
										name="characteristics.sewer"
										type="checkbox"
										component={Checkbox}
									/>
									<div className={styles['check-label']}>
										cedula de identidad o pasaporte
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</section>
			}
		</Modal>
	);
};

export default index;
