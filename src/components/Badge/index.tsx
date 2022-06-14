import React from 'react';
import classNames from 'classnames';

export interface BadgeProps {
	variant?: 'success' | 'danger';
	label?: string;
}

const Badge:React.FC<BadgeProps> = ({label, variant}) => {

	const classes = classNames({
		badge: true,
		[`badge-${variant}`]: variant,
	});

	return (
		<span className={classes}>{label}</span>
	);
};

export default Badge;
