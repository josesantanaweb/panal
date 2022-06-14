import React from 'react';
import classNames from 'classnames';

export interface CheckboxProps {
	className?: string;
	label?: string;
	value?: string;
	placeholder?: string;
	field?: any;
	disabled?: boolean;
	imagen?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
	field,
	label,
	disabled,
	value,
	imagen,
}) => {

	const toggleClasses = classNames({
		'checkbox-toggle': true,
		'is-active': field?.value,
	});

	return (
		<label className="checkbox">
			<span className={toggleClasses}></span>
			<input
				{...field}
				type="checkbox"
				checked={value}
				disabled={disabled}
			/>
			{
				!label
					? <img src={imagen} alt="" />
					: <p>{label}</p>
			}
		</label>
	);
};

export default Checkbox;
