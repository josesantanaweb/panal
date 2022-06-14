import { useContext } from 'react';
import PropertiesContext from 'context/PropertiesContext';

const useProperties = () => {
	return useContext(PropertiesContext);
};

export default useProperties;
