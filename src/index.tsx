import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import "./styles/index.scss";
import { store } from "store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
