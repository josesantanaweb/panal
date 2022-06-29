import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { Button } from 'components';

const Draft = ({ drafts }: any) => {
	const navigate = useNavigate();

	const handleRecover = (property: any) => {
		navigate('/add-property');
	};

	return (
		<div className="draft">
			<div className="draft-items">
				{drafts.length
					? drafts.map((property: any, index: number) => (
						<div className="draft-item" key={index}>
							<div className="draft-item-info">
								<span className="draft-item-icon">
									<BiError size={24} />
								</span>
								<h3 className="draft-item-title">
										Usted tiene borradores de propiedades
								</h3>
							</div>
							<div className="draft-item-description">
								<p className="mb-1">
										Seleccione si quiere continuar con uno de ellos o
										descartarlos definitavamente
								</p>
								<p>Borrador guardado el 01/04/2022 a las 12:50</p>
							</div>
							<div className="draft-item-actions">
								<Button block variant="outline">
										Descartar
								</Button>
								<Button block onClick={() => handleRecover(property)}>
										Recuperar
								</Button>
							</div>
						</div>
					  ))
					: null}
			</div>
		</div>
	);
};

export default Draft;
