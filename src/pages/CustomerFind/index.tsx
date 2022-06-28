import React, { useState, useEffect } from 'react';
import { BiPencil, BiTrash, BiSpreadsheet } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Preloader, Badge, Search, Select, Input } from 'components';
import Content from 'layout/Content';
import ContentHead from 'layout/ContentHead';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { findFirstLetter } from 'utils';
import CustomersFindServices from 'services/CustomersFindService';
import useCustomersFind from 'hooks/useCustomersFind';
import useShared from 'hooks/useShared';
import Customer from './Customer';

const CustomerFind: React.FC = () => {
	const { customersFind, loading, getCustomersFind, setCustomerFind }: any =
		useCustomersFind();
	const [modalDetail, setModalDetail] = useState(false);
	const { getDocuments }: any = useShared();

	useEffect(() => {
		getCustomersFind();
	}, []);

	useEffect(() => {
		getDocuments();
	}, []);

	if (loading) return <Preloader />;

	const searchCustomerFind = async (e: any) => {
		getCustomersFind(e.target.value);
	};

	const { documentSelected, setDocumentSelected, documents }: any = useShared();

	const handleDetail = (customer: any) => {
		setModalDetail(true);
		setCustomerFind(customer);
	};

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value,
		};
		try {
			await CustomersFindServices.addCustomerFind(formData);
			getCustomersFind();
			resetForm();
		} catch (error) {
			toastError('Error al Crear Cliente busca');
		}
	};

	return (
		<React.Fragment>
			<Content>
				<ContentHead title="Cliente Busca" description="lorem impsum" />
				<div className="row mb-4">
					<div className="col-md-3">
						<div className="search-customer">
							<Search placeholder="Buscar" onChange={searchCustomerFind} />
						</div>
					</div>
				</div>
				<div className="row mb-4">
					<h3 className="mb-3">Filtrar por categoría</h3>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Tipo de operación"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Tipo de propiedad"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Región"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Comuna"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-3">
						<div className="">
							<Select
								label="Tipo de moneda"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
					<div className="col-md-1">
						<Input label="Precio min. $" placeholder="$" />
					</div>
					<div className="col-md-2">
						<Input label="Precio máx. $" placeholder="$" />
					</div>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Dormitorios"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
					<div className="col-md-3">
						<div className="">
							<Select
								label="Baños"
								options={documents}
								setSelected={setDocumentSelected}
								selected={documentSelected}
							/>
						</div>
					</div>
				</div>
				<div className="table-list mb-3">
					<div className="row mb-4">
						{customersFind.length
							? customersFind.map((customer: any, index: number) => (
									<div key={index} className="col-md-3">
										<Customer
											key={index}
											customer={customer}
											setModalDetail={() => handleDetail(customer)}
										/>
									</div>
							  ))
							: null}
					</div>
				</div>
			</Content>
			<ToastContainer />
		</React.Fragment>
	);
};

export default CustomerFind;
