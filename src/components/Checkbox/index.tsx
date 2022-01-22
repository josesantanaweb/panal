import React from 'react';

import styles from "./styles.module.scss";
import {CheckboxProps} from "./types";

const Checkbox: React.FC<CheckboxProps> = ({handleToggle, label, value}) => {
	const checkboxClasses = [
		styles["checkbox-toggle"],
		value ? styles["is-active"] : ""
	].join(' ');

	return (
		<div className={styles.checkbox} onClick={handleToggle}>
			<span className={checkboxClasses}></span>
			<p>{label}</p>
		</div>
	);
};

export default Checkbox;
