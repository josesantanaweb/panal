import React, {useState} from 'react';
import classNames from 'classnames';
import { BiDetail, BiDotsHorizontalRounded, BiEdit, BiMap, BiSend, BiStar, BiTrash } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

export interface PropertyProps {
	property: any;
  handleProperty: any;
  code: string;
  canje?: boolean;
}


const Property:React.FC<PropertyProps> = ({property, handleProperty, code, canje}) => {
	const [openAction, setOpenAction] = useState(false);

	const classes = classNames({
		'list-property': true,
		'is-active': code === property.code
	});

	return (
		<div className={classes} onClick={handleProperty}>
			<div className="list-property-thumb">
				<img src={property.imgUrl} alt="casa" />
			</div>
			<div className="list-property-content">
				<h4 className="list-property-title">{property.title}</h4>
				<div className="list-property-city">
					<BiMap size={18}/>
					<p>{property.city}</p>
				</div>
			</div>
			<div className="list-property-ranking">
				<h4>Jose Santana</h4>
				<div className="list-property-star">
					<FaStar size={18}/>
					<FaStar size={18}/>
					<FaStar size={18}/>
					<FaStar size={18}/>
					<FaStar size={18}/>
				</div>
				<p>20 Calificaciones</p>
			</div>
			<h4 className="list-property-price">$ {property.price}</h4>
			<div className="list-property-toggle" onClick={() => setOpenAction(!openAction)}>
				<BiDotsHorizontalRounded />
				{
					openAction &&
          <div className="list-property-action">
          	<li>
          		<BiDetail size={18}/>
          		<span>Ver Propiedad</span>
          	</li>
          	{
          		canje &&
              <>
              	<li>
              		<BiSend size={18}/>
              		<span>Enviar</span>
              	</li>
              	<li>
              		<BiEdit size={18}/>
              		<span>Editar</span>
              	</li>
              	<li>
              		<BiStar size={18}/>
              		<span>Evaluar</span>
              	</li>
              	<li>
              		<BiTrash  size={18}/>
              		<span>Borrar</span>
              	</li>
              </>
          	}
          </div>
				}
			</div>
		</div>
	);
};

export default Property;
