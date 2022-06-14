import React, {useEffect, useState} from 'react';
import { Button, Search } from 'components';
import useProperties from 'hooks/useProperties';
import Property from '../Property';
import { BiFilter } from 'react-icons/bi';

export interface SelectionProps {
  setProperty: any
  setSelection: any
  setGenerate: any
}

const Selection:React.FC<SelectionProps> = ({setSelection, setProperty, setGenerate}) => {
	const { properties, getProperties }:any = useProperties();
	const [code, setCode] = useState('');

	useEffect(() => {
		getProperties();
	}, []);

	const handleProperty = (property: any) => {
		setProperty(property);
		setCode(property.code);
	};

	const searchProperty = (e: any) => {
		getProperties(e.target.value);
	};

	const handleNext = () => {
		setSelection(false);
		setGenerate(true);
	};

	return (
		<div className="modal-scroll">
			<div className="row mb-4">
				<div className="col-md-12">
					<Search
						placeholder="Que titulo de propiedad buscar?"
						onChange={searchProperty}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h3>Filtrar por categorias:</h3>
				</div>
			</div>
			<div className="row mb-5">
				<div className="col-md">
					<Button>Cartera</Button>
				</div>
				<div className="col-md">
					<Button>Empresa</Button>
				</div>
				<div className="col-md">
					<Button>C Abierta</Button>
				</div>
				<div className="col-md">
					<Button>C Broker</Button>
				</div>
				<div className="col-md-1">
					<div className="filter-icon">
						<BiFilter />
					</div>
				</div>
			</div>
			<div className="row mb-5">
				<div className="col-md-12">
					{
						properties.length
							? properties.map((property: any, index: number) => (
								<Property
									key={index}
									property={property}
									code={code}
									handleProperty={() => handleProperty(property)}
								/>
							))
							: null
					}
				</div>
			</div>
			<div className="row">
				<div className="offset-md-10 col-md-2">
					<Button onClick={handleNext} disabled={code === ''}>Siguiente</Button>
				</div>
			</div>
		</div>
	);
};

export default Selection;
