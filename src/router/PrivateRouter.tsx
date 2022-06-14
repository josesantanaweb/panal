import React from 'react';
import { useOutlet, Navigate } from 'react-router-dom';
import Layout from 'layout';
import useAuth from 'hooks/useAuth';
import { getValue } from 'utils';

const PrivateRouter = () => {
	const { user }: any = useAuth();
	const outlet = useOutlet();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<Layout>
			{ outlet }
		</Layout>
	);
};

export default PrivateRouter;
