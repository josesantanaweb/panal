import React from 'react';

import styles from "./styles.module.scss";
import {CheckboxProps} from "./types";

const Checkbox: React.FC<CheckboxProps> = ({label, name, value,	field, form, imagen, ...props}) => {
	const checkboxClasses = [
		styles["checkbox-toggle"],
		field?.value ? styles["is-active"] : ""
	].join(' ');

	return (
		<label className={styles.checkbox}>
			<span className={checkboxClasses}></span>
			<input
				type="checkbox"
				checked={value}
				value={value}
				name={name}
				{...field}
				{...props}
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
