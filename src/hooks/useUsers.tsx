import { useContext } from 'react';
import UsersContext from 'context/UsersContext';

const useUsers = () => {
	return useContext(UsersContext);
};

export default useUsers;
