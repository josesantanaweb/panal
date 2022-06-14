import { useState, createContext } from 'react';
import RealtorsServices from 'services/realtorsService';

interface props {
  children: JSX.Element | JSX.Element[]
}

const RealtorsContext = createContext({});

export const RealtorsProvider = ({children}: props) => {
	const [realtors, setRealtors] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getRealtors = async () => {
		RealtorsServices.getRealtors().then((response) => {
			setRealtors(response.data.data);
			setLoading(false);
		}).catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<RealtorsContext.Provider value={{
			realtors,
			setRealtors,
			getRealtors,
			loading
		}}>
			{children}
		</RealtorsContext.Provider>
	);
};


export default RealtorsContext;
