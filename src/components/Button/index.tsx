import React from 'react';
import classNames from 'classnames';

export interface ButtonProps {
	variant?: string;
	size?: string;
	className?: string;
	outline?: string;
	disabled?: boolean;
	type?: 'submit' | 'button';
	block?: boolean;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size,
	type = 'submit',
	className,
	outline,
	disabled,
	children,
	block,
	onClick,
	...props
}) => {
	const classes = classNames({
		button: true,
		[`button-${variant}`]: !outline,
		[`button-outline-${variant}`]: outline,
		[`button-${size}`]: size,
		'button-disabled': disabled,
		'button-block': block,
		[`${className}`]: className,
	});

	return (
		<button
			className={classes}
			{...props}
			onClick={onClick}
			disabled={disabled}
			type={type}>
			{children}
		</button>
	);
};

export default Button;
