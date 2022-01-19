import React, {useRef} from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import useOnClickOutside from 'hooks/useOnClickOutside';

import styles from './styles.module.scss';

import { SelectProps } from "./types";

const Select: React.FC<SelectProps> = (
	{
		options,
		selectedOption,
		setSelectedOption,
		open,
		setOpen,
		handleOpenSelect,
		label,
		required
	}) => {
	const ref = useRef(null);
	const handleClickOutside = () => setOpen(false);

	useOnClickOutside(ref, handleClickOutside);

	const handleSelectedOption = (option: any) => (event: any) => {
		setSelectedOption(option);
		setOpen(false);
	};

	return (
		<div className={styles.select} ref={ref}>
			{label &&
				<label className={styles["select-label"]}>
					{label}<span>{required && '*'}</span>
				</label>
			}
			<div className={styles["select-container"]} ref={ref}>
				<div onClick={handleOpenSelect} className={styles["select-option"]}>
					<span>{selectedOption.label}</span>
					{ open ? <BiChevronUp/> : <BiChevronDown/>}
				</div>
				{
					open &&
          <ul className={styles["select-items"]}>
          	{options
          		.map((selectedOption, index) => (
          			<li key={index} onClick={handleSelectedOption(selectedOption)}>{selectedOption.label}</li>
          		))
          	}
          </ul>
				}
			</div>
		</div>
	);
};

export default Select;
