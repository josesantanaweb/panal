import React, {useEffect, useState} from 'react';
import useProperties from 'hooks/useProperties';
import useOrdes from 'hooks/useOrders';
import Property from '../Property';

const List = () => {
	const { properties, getProperties }:any = useProperties();
	const { canje }:any = useOrdes();
	const [code, setCode] = useState('');

	useEffect(() => {
		getProperties();
	}, []);

	const handleProperty = (property: any) => {
		setCode(property.code);
	};

	return (
		<div className="row mb-5">
			<div className="col-md-12">
				{
					canje?.length
						? canje?.map((property: any, index: number) => (
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
