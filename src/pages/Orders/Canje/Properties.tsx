import React, {useEffect, useState} from 'react';
import useProperties from 'hooks/useProperties';
import useOrdes from 'hooks/useOrders';
import { Button } from 'components';
import { toastSuccess } from 'utils/libs/toast';
import Property from '../Property';

const Properties = () => {
	const { properties, getProperties }:any = useProperties();
	const { setCanje, canje }:any = useOrdes();
	const [code, setCode] = useState('');
	const [property, setProperty] = useState();

	useEffect(() => {
		getProperties();
	}, []);

	const handleProperty = (property: any) => {
		setCode(property.code);
		setProperty(property);
	};

	const addProperty = () => {
		let arr = [...canje, property];
		setCanje(arr);
		toastSuccess('Propiedad Agregada a canje');
	};

	return (
		<>
			<div className="row mb-4">
				<div className="offset-md-8 col-md-4">
					<Button block disabled={code === ''} onClick={addProperty}>
            Agregar a la lista
					</Button>
				</div>
			</div>
			<div className="row">
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
		</>
	);
};

export default Properties;
