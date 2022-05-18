import React from 'react';
import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './styles.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';

type Props = {
	openModal: boolean;
	setOpenModal: any;
};

const index = (props: Props) => {
	const INITIAL_VALUES = {};
	const onSubmit = function name(params: any) {};
	return (
		<section className={styles['modal']}>
			<Modal
				openModal={props.openModal}
				setOpenModal={props.setOpenModal}
				title="Generar orden de visita"
			>
				{
					<section className={styles['modal-child']}>
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
											<span>Certificado de antiguedad laboral, minimo</span>
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											<span>meses</span>
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
											Aval o codeudor solidario con la misma documentacion
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											<span>Contrato de arriendo, minimo por</span>
											<Field
												className={styles['check-input']}
												type="text"
												name="observations.publicTitle"
												placeholder="0"
												component={Input}
											/>
											<span>meses</span>
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											<span>Pago de garantias equivalente a </span>
											<Field
												className={styles['check-input']}
												type="text"
												name="observations.publicTitle"
												placeholder="0"
												component={Input}
											/>
											<span>meses de arriendo</span>
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											No se permiten mascotas
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											Copia de contrato de trabajo (trabajadores dependientes)
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											<span>Ultimas</span>
											<Field
												className={styles['check-input']}
												type="text"
												name="observations.publicTitle"
												placeholder="0"
												component={Input}
											/>
											<span>cotizaciones previsionales</span>
										</div>
									</div>
									<div className={styles['check-element']}>
										<Field
											name="characteristics.sewer"
											type="checkbox"
											component={Checkbox}
										/>
										<div className={styles['check-label']}>
											Carpeta tributaria SII (independientes)
										</div>
									</div>
									<div className={styles['modal-actions']}>
										<div className={styles['cancel']}>
											<Button variant="outline">Cancelar</Button>
										</div>
										<div className={styles['save']}>
											<Button variant="primary">Guardar</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</section>
				}
			</Modal>
		</section>
	);
};

export default index;
