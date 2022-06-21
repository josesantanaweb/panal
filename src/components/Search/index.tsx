import React from 'react';
import { BiSearch } from 'react-icons/bi';

export interface SearchProps {
  placeholder: string;
	onChange: any;
  iconSeach?: boolean
}

const Search:React.FC<SearchProps> = ({onChange, placeholder, iconSeach}) => {
	return (
		<div className="search">
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
