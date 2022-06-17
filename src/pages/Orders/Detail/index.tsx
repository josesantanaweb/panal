import React from 'react';
import { Modal } from 'components';
import { BiMap, BiHotel, BiBath, BiCar, BiRuler } from 'react-icons/bi';

export interface DetailProps {
  modal: boolean;
	setModal: any;
	property: any;
}

const Detail:React.FC<DetailProps> =  ({modal, setModal, property}) => {
	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Detalle de Propiedad">
			<div className="detail-property">
				<div className="detail-property-thumb">
					<img src={property.imgUrl} alt="casa" />
				</div>
				<h4 className="property-title">{property.title}</h4>
				<div className="property-city">
					<BiMap size={18}/>
					<p>{property.city}</p>
				</div>
				<div className="property-services mb-4">
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
				<h4 className="property-price mb-4">$ {property.price}</h4>
				<h4 className="property-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, fugit ratione! Officiis libero aliquam accusamus ullam aut, impedit cupiditate voluptatum?
				</h4>
			</div>
		</Modal>
	);
};

export default Detail;
