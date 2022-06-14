import React from 'react';
import { Button, Input } from 'components';

export interface ContentHeadProps {
	onClick?: () => void;
	title?: string;
}


const ContentHead:React.FC<ContentHeadProps> = ({ onClick, title }) => {
	return (
		<div className="content-head">
			<div className="content-description">
				<h3>{title}</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh nulla, mattis vestibulum consequat eget, luctus vitae tortor.</p>
			</div>
			<ul className="content-toggle">
				<Button onClick={onClick}>
          Agregar
				</Button>
			</ul>
		</div>
	);
};

export default ContentHead;
