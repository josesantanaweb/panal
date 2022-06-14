import { useState, createContext } from 'react';
import UsersServices from 'services/usersService';

interface props {
  children: JSX.Element | JSX.Element[]
}

const UsersContext = createContext({});

export const UsersProvider = ({children}: props) => {
	const [users, setUsers] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getUsers = () => {
		UsersServices.getUsers().then((response) => {
			setUsers(response.data.data);
			setLoading(false);
		}).catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<UsersContext.Provider value={{
			users,
			setUsers,
			getUsers,
			loading
		}}>
			{children}
		</UsersContext.Provider>
	);
};


export default UsersContext;
