import React from 'react';
import classNames from 'classnames';

interface ToggleProps {
	onClick?: () => void;
	className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ className, onClick, children }) => {
	const classes = classNames({ [`${className}`]: className });

	return (
		<div className={classes} onClick={onClick}>
			{children}
		</div>
	);
};
export default Toggle;
