import React from 'react';
import { BiSearch } from 'react-icons/bi';

export interface SearchProps {
  placeholder: string;
	onChange?: any;
  label?: string;
  iconSeach?: boolean
}

const Search:React.FC<SearchProps> = ({onChange, placeholder, iconSeach, label}) => {
	return (
		<div className="search">
			{label && <label className="label">{label}</label>}
			<input
				type="text"
				className="input"
				placeholder={placeholder}
				onChange={onChange}
			/>
			{
				iconSeach &&
        <span>
        	<BiSearch />
        </span>
			}
		</div>
	);
};

export default Search;
