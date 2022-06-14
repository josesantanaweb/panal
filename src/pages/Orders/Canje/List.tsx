import React, {useEffect, useState} from 'react';
import useProperties from 'hooks/useProperties';
import Property from '../Property';

const List = () => {
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
		<div className="row mb-5">
			<div className="col-md-12">
				{
					properties.length
						? properties.map((property: any, index: number) => (
							<Property
								key={index}
								property={property}
								code={code}
								canje={true}
								handleProperty={() => handleProperty(property)}
							/>
						))
						: null
				}
			</div>
		</div>
	);
};

export default List;
