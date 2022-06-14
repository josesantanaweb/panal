import React, {useEffect, useState} from 'react';
import useProperties from 'hooks/useProperties';
import { Button } from 'components';
import Property from '../Property';

const Properties = () => {
	const { properties, getProperties }:any = useProperties();
	const [code, setCode] = useState('');

	useEffect(() => {
		getProperties();
	}, []);

	const handleProperty = (property: any) => {
		console.log(property);
		setCode(property.code);
	};

	return (
		<>
			<div className="row mb-4">
				<div className="offset-md-8 col-md-4">
					<Button block disabled={code === ''}>
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
