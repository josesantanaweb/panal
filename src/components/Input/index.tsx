import React from "react";
import { BiSearch } from "react-icons/bi";

import { InputProps } from "./types";
import styles from "./styles.module.scss";

const Input:React.FC<InputProps> = (
	{
		type="text",
		onChange,
		handeleSearch,
		disabled,
		search,
		id,
		label,
		required,
		name,
		value,
		placeholder,
		field,
		form,
		error,
		textarea,
		...props
	}) => {

	const inputClasses = [
		styles.input,
		disabled ? styles["input-disabled"] : "",
	].join(' ');
	return (
		<div className={inputClasses}>
			{label && <label htmlFor={id}>{label} {required && <span>*</span>}</label>}
			{
				search &&
			  <span className={styles["icon-search"]} onClick={handeleSearch}><BiSearch/></span>
			}
			{
				textarea ?
					<textarea
						id={id}
						name={name}
						value={value}
						disabled={disabled}
						placeholder={placeholder}
						onChange={onChange}
						cols={30}
						rows={10}
						{...field}
						{...props}
					/>
					:
					<input
						id={id}
						type={type}
						name={name}
						value={value}
						disabled={disabled}
						placeholder={placeholder}
						onChange={onChange}
						{...field}
						{...props}
					/>
			}
			{
				error &&
				<span className={styles["input-error"]}>{error}</span>
			}
		</div>
	);
};

export default Input;
