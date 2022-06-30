import React, { useEffect, useState } from 'react';
import useProperties from 'hooks/useProperties';
import Property from '../Property';

const List = () => {
	const { getExchangeProperties, exchangeProperties }: any = useProperties();
	const [code, setCode] = useState('');

	useEffect(() => {
		getExchangeProperties();
	}, []);

	const handleProperty = (property: any) => {
		setCode(property.code);
	};

	return (
		<div className="row mb-5">
			<div className="col-md-12">
				{exchangeProperties.length
					? exchangeProperties.map((property: any, index: number) => (
						<Property
							key={index}
							property={property}
							code={code}
							handleProperty={() => handleProperty(property)}
						/>
					  ))
					: null}
			</div>
		</div>
	);
};

export default List;
