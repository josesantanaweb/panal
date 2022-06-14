import React from 'react';
import { BiSearch } from 'react-icons/bi';

export interface SearchProps {
  placeholder: string;
	onChange: any;
}

const Search:React.FC<SearchProps> = ({onChange, placeholder}) => {
	return (
		<div className="search">
			<input
				type="text"
				className="input"
				placeholder={placeholder}
				onChange={onChange}
			/>
			<span>
				<BiSearch />
			</span>
		</div>
	);
};

export default Search;
