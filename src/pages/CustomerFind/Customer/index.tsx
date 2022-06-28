import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import { FaBed } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Button, Badge } from 'components';
import { useOnClickOutside } from 'usehooks-ts';
import casa from 'assets/images/casa.jpg';

export interface CustomerProps {
	customer?: any;
	setModalDetail?: any;
}

const Customer: React.FC<CustomerProps> = ({ customer, setModalDetail }) => {
	const ref = useRef(null);
	const [openAction, setOpenAction] = useState(false);

	const handleClickOutside = () => setOpenAction(false);

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className="customer-find">
			<div className="customer-find-thumb">
				<div className="customer-find-header">
					<div className="customer-find-img">
						<img
							src="https://www.sigueme.net/imagenes/joven-con-perfil-empresario.jpg"
							alt="img-customer"
						/>
					</div>

					<div className="customer-find-code">
						<h2>
							{customer?.name} {customer?.lastName}
						</h2>
						<p>rol</p>
						<span>
							<Badge variant="success" label={customer?.operation?.name} />
						</span>
					</div>
				</div>
			</div>

			<div className="customer-characteristics">
				<span>
					{customer?.characteristics?.minPrice} min-
					{customer?.characteristics?.maxPrice} máx
				</span>
				<ul className="customer-characteristics__items">
					<li>
						<BiRuler />
						<p>1</p>
					</li>
					<li>
						<BiCar />
						<p>1</p>
					</li>
					<li>
						<BiBath />
						<p>{customer?.characteristics?.bathrooms}</p>
					</li>
					<li>
						<FaBed />
						<p>{customer?.characteristics?.bedrooms}</p>
					</li>
				</ul>
				<div className="customer-details">
					<p>Región - Comuna</p>
				</div>
				<div className="customer-detail__link">
					<Link to="/">
						<p>Contactar</p>
						<span>
							<MdArrowBackIosNew />
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Customer;
