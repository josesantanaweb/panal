import React from 'react';
import classNames from 'classnames';

export interface InputProps {
	className?: string;
	label?: string;
	placeholder?: string;
	field?: any;
	disabled?: boolean;
	error?: boolean;
  value?: any
  readOnly?: any
}

const Input: React.FC<InputProps> = ({
	field,
	label,
	disabled,
	className,
	placeholder,
	error,
	...props
}) => {
	const classes = classNames({
		input: true,
		'input-disabled': disabled,
		'input-error': error,
		[`${className}`]: className,
	});

	const labelClasses = classNames({
		label: true,
		'label-error': error,
		[`${className}`]: className,
	});

	return (
		<div className="input-container">
			{label && <label className={labelClasses}>{label}</label>}
			<input {...field} {...props} disabled={disabled} className={classes} placeholder={placeholder}/>
			{
				error &&
        <span className="input-message">{error}</span>
			}
		</div>
	);
};

export default Input;
