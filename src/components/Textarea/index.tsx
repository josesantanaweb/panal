import React from 'react';
import classNames from 'classnames';

export interface TextareaProps {
	className?: string;
	label?: string;
	placeholder?: string;
	field?: any;
	disabled?: boolean;
	error?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
	field,
	label,
	disabled,
	className,
	placeholder,
	error,
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
			<textarea
				{...field}
				disabled={disabled}
				className={classes}
				placeholder={placeholder}
				cols={30}
				rows={5}
			/>
			{
				error &&
        <span className="input-message">{error}</span>
			}
		</div>
	);
};

export default Textarea;
