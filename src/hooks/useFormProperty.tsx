import { useContext } from 'react';
import FormPropertyContext from 'context/FormPropertyContext';

const useFormPropertyContext = () => {
	return useContext(FormPropertyContext);
};

export default useFormPropertyContext;
