import { useContext } from 'react';
import FilterContext from 'context/FilterContext';

const useFilter = () => {
	return useContext(FilterContext);
};

export default useFilter;
