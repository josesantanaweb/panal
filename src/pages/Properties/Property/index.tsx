import React, { useState, useRef } from 'react';
import {
	BiMap,
	BiHotel,
	BiBath,
	BiCar,
	BiRuler,
	BiDotsVerticalRounded,
	BiEditAlt,
	BiHome,
	BiDuplicate,
	BiFile,
	BiTrash,
} from 'react-icons/bi';
import { Button } from 'components';
import { useOnClickOutside } from 'usehooks-ts';
import casa from 'assets/images/casa.jpg';

export interface PropertyProps {
	property?: any;
	setModalDetail?: any;
}

const Property: React.FC<PropertyProps> = ({ property, setModalDetail }) => {
	const ref = useRef(null);
	const [openAction, setOpenAction] = useState(false);

	const handleClickOutside = () => setOpenAction(false);

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className="property">
			<div className="property-thumb">
				<img src={property.imgUrl} alt="casa" />
				<div className="property-code">
					<p>{property.title}</p>
					<p>{property.code}</p>
				</div>
				<div className="property-toggle" ref={ref}>
					<span onClick={() => setOpenAction(!openAction)}>
						<BiDotsVerticalRounded size={24} />
					</span>
					{openAction && (
						<div className="property-actions">
							<li>
								<BiEditAlt size={18} />
								<span>Editar</span>
							</li>
							<li>
								<BiHome size={18} />
								<span>Agregar a canje</span>
							</li>
							<li>
								<BiDuplicate size={18} />
								<span>Duplicar</span>
							</li>
							<li>
								<BiFile size={18} />
								<span>Bitacora</span>
							</li>
							<li>
								<BiTrash size={18} />
								<span>Dar de baja</span>
							</li>
						</div>
					)}
				</div>
				<div className="property-status">
					<p>{property.status}</p>
				</div>
			</div>
			<h4 className="property-title">{property.title}</h4>
			<div className="property-city">
				<BiMap size={18} />
				<p>{property.city}</p>
			</div>
			<div className="property-row">
				<div className="property-services">
					<li>
						<BiHotel />
						<p>1</p>
					</li>
					<li>
						<BiBath />
						<p>1</p>
					</li>
					<li>
						<BiCar />
						<p>1</p>
					</li>
					<li>
						<BiRuler />
						<p>1</p>
					</li>
				</div>
				<h4 className="property-price">$ {property.price}</h4>
			</div>
			<Button block onClick={() => setModalDetail(true)}>
				Ver Detalles
			</Button>
		</div>
	);
};

export default Property;
