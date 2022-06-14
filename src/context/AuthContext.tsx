import { useState, useEffect, createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeItem, saveValue, getValue } from 'utils';

interface props {
  children: JSX.Element | JSX.Element[]
}

const AuthContext = createContext({});

const local = getValue('user');

export const AuthProvider = ({children}: props) => {
	const [user, setUser] = useState(JSON.parse(local) ? JSON.parse(local) : null);
	const [token, setToken] = useState(null);
	const navigate = useNavigate();

	const login = async (data: any) => {
		setUser(data);
		saveValue('user', data);
		saveValue('token', data.access_token);
		setToken(data.access_token);
		navigate('/users', { replace: true });
	};

	const logout = () => {
		setUser(null);
		removeItem('token');
		removeItem('user');
		navigate('/home', { replace: true });
	};

	const value = useMemo(
		() => ({
			user,
			token,
			login,
			logout
		}),
		[user]
	);

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};


export default AuthContext;
