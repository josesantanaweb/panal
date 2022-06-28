import React from 'react';
import { Button, Input } from 'components';

export interface ContentHeadProps {
	onClick?: () => void;
	title?: string;
	description?: string;
	btnText?: string;
}

const ContentHead: React.FC<ContentHeadProps> = ({
	onClick,
	title,
	description,
	btnText,
}) => {
	return (
		<div className="content-head">
			<div className="content-description">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<ul className="content-toggle">
				<Button onClick={onClick}>{btnText}</Button>
			</ul>
		</div>
	);
};

export default ContentHead;
