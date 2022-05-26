import React from 'react';
import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './styles.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
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
							<TabPanel>1</TabPanel>
							<TabPanel>2</TabPanel>
						</Tabs>

						<Formik
							initialValues={INITIAL_VALUES}
							// validationSchema={validationSchema.addProperty}
							onSubmit={onSubmit}
						>
							{({ errors, touched, isValid, dirty }) => <Form></Form>}
						</Formik>
					</section>
				}
			</Modal>
		</section>
	);
};

export default index;
