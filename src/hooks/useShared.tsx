import { useContext } from 'react';
import SharedContext from 'context/SharedContext';

const useShared = () => {
	return useContext(SharedContext);
};

export default useShared;
