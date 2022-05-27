import React from 'react';
import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './styles.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import CardCanje from './CardCanje';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
				title="Propiedades en canje"
				xl={true}
			>
				{
					<section className={styles['modal-child']}>
						<Tabs className="tabs">
							<TabList>
								<Tab>Propiedades</Tab>
								<Tab>listado</Tab>
							</TabList>
							<TabPanel>
								<Formik
									initialValues={INITIAL_VALUES}
									// validationSchema={validationSchema.addProperty}
									onSubmit={onSubmit}
								>
									{({ errors, touched, isValid, dirty }) => (
										<Form>
											<div className={styles['check-element']}>
												<div></div>
												<div className={styles['check-tile']}>
													<span>Propiedad</span>
													<span></span>
													<span></span>
													<span>Ranking canje</span>
													<span>status</span>
													<span></span>
													<span></span>
												</div>
											</div>
											{/* CHECK ELEMENT */}
											<div className={styles['check-element']}>
												<Field
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
												/>
												<CardCanje></CardCanje>
											</div>
											<div className={styles['check-element']}>
												<Field
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
												/>
												<CardCanje></CardCanje>
											</div>
											<div className={styles['check-element']}>
												<Field
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
												/>
												<CardCanje></CardCanje>
											</div>
											<div className={styles['check-element']}>
												<Field
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
												/>
												<CardCanje></CardCanje>
											</div>
										</Form>
									)}
								</Formik>
							</TabPanel>

							<TabPanel>2</TabPanel>
						</Tabs>
					</section>
				}
			</Modal>
		</section>
	);
};

export default index;
