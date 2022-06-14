import { useContext } from 'react';
import RealtorsContext from 'context/RealtorsContext';

const useRealtors = () => {
	return useContext(RealtorsContext);
};

export default useRealtors;
