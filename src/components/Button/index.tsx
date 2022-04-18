import React from "react";

import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

const Button:React.FC<ButtonProps> = (
	{
		children,
		variant="tertiary",
		type="button",
		onClick,
		full,
		disabled
	}) => {
	const buttonClasses = [
		styles.button,
		variant === "primary" ? styles["button-primary"] : "",
		variant === "secondary" ? styles["button-secondary"] : "",
		variant === "tertiary" ? styles["button-tertiary"] : "",
		variant === "gray" ? styles["button-gray"] : "",
		variant === "error" ? styles["button-error"] : "",
		variant === "outline" ? styles["button-outline"] : "",
		disabled ? styles["button-disabled"] : "",
		full ? styles["button-full"] : "",
	].join(' ');

	return (
		<button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
