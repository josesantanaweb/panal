import React, {useState} from "react";
import { BiMap, BiHotel, BiBath, BiCar, BiFilterAlt, BiListUl } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Button from "components/Button";
import Input from "components/Input";
import Select from "components/Select";
import Property from "components/Property";
import { ISelect } from "interfaces";
import styles from "./styles.module.scss";

// Status Options
const statusOptions = [
	{
		label: "Publicada",
		value: "publicada",
	},
	{
		label: "No Publicada",
		value: "no publicada",
	},
	{
		label: "Vendida",
		value: "vendida",
	}
];

const pageOptions = [
	{
		label: 10,
		value: 10,
	},
	{
		label: 20,
		value: 20,
	},
	{
		label: 30,
		value: 30,
	}
];

const Properties = () => {
	const [openSelectStatus, setOpenSelectStatus] = useState<boolean>(false);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const [filterStatus, setFilterStatus] = useState<ISelect>(statusOptions[0]);
	const [page, setPage] = useState<ISelect>(pageOptions[0]);

	const handleOpenStatus = () => setOpenSelectStatus(true);
	const handleOpenPage = () => setOpenSelectPage(true);

	return (
		<div className={styles.properties}>
			<Tabs className="tabs">
				<TabList>
					<Tab>Propiedades</Tab>
					<Tab>Borradores</Tab>
					<Tab>Caracteristicas</Tab>
				</TabList>
				<TabPanel>
					<div className={styles["properties-wrapper"]}>
						<div className={styles["properties-top"]}>
							<div>
								<h2 className={styles["properties-title"]}>Mis Propiedades</h2>
								<p className={styles["properties-total"]}>10 Total</p>
							</div>
							<Button>Agregar Propiedad</Button>
						</div>
						<div className={styles["properties-filter"]}>
							<div className={styles["properties-column"]}>
								<Select
									options={pageOptions}
									selectedOption={page}
									setSelectedOption={setPage}
									open={openSelectPage}
									setOpen={setOpenSelectPage}
									handleOpenSelect={handleOpenPage}
								/>
							</div>
							<div className={styles["properties-column"]}>
								<Select
									options={statusOptions}
									selectedOption={filterStatus}
									setSelectedOption={setFilterStatus}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles["properties-column"]}>
								<Input placeholder="Buscar..." search/>
							</div>
							<div className={styles["properties-toggle"]}>
								<BiFilterAlt/>
							</div>
							<div className={styles["properties-toggle"]}>
								<BiListUl/>
							</div>
						</div>
						<div className={styles["properties-items"]}>
							<Property />
							<Property />
							<Property />
							<Property />
						</div>
					</div>
				</TabPanel>
				<TabPanel>
				Borradores
				</TabPanel>
				<TabPanel>
				Caracteristicas
				</TabPanel>
			</Tabs>
		</div>
	);
};


export default Properties;
