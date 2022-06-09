import React, { useState, useEffect } from 'react';
import { ISelect } from 'interfaces';

import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './styles.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import CardCanje from './CardCanje';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select from 'components/Select';
type Props = {
	openModal: boolean;
	setOpenModal: any;
};
import { BsFilter } from 'react-icons/bs';

const index = (props: Props) => {
	const INITIAL_VALUES = {};
	const onSubmit = function name(params: any) {};
	const [openSelect, setOpenSelect] = useState<boolean>(false);
	const [TypeOptions, setTypeOptions] = useState<ISelect[]>([]);
	const option: ISelect[] = [
		{
			label: 'Agregar a lista',
			value: 1,
		},
		{
			label: 'Rechazar',
			value: 1,
		},
	];

	// Handle Open  select
	const handleOpen = () => setOpenSelect(true);

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
											<div className={styles['check-all']}>
												<Field
													className={styles['check']}
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
													label="Seleccionar todo"
												/>
												<div className={styles['check-select']}>
													<Select
														options={option}
														label="Acciones"
														required
														selectedOption={TypeOptions}
														setSelectedOption={setTypeOptions}
														open={openSelect}
														setOpen={setOpenSelect}
														handleOpenSelect={handleOpen}
													/>
												</div>
												<div className={styles['check-filter']}>
													<BsFilter></BsFilter>
												</div>
											</div>

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

							<TabPanel>
								<Formik
									initialValues={INITIAL_VALUES}
									// validationSchema={validationSchema.addProperty}
									onSubmit={onSubmit}
								>
									{({ errors, touched, isValid, dirty }) => (
										<Form>
											<div className={styles['check-all']}>
												<Field
													className={styles['check']}
													name="characteristics.sewer"
													type="checkbox"
													component={Checkbox}
													label="Seleccionar todo"
												/>
												<div className={styles['list-button']}>
													<Button>Enviar unidades seleccionadas</Button>
												</div>
											</div>

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
						</Tabs>
					</section>
				}
			</Modal>
		</section>
	);
};

export default index;
