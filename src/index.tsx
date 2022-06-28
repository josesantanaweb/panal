import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { UsersProvider } from 'context/UsersContext';
import { RealtorsProvider } from 'context/RealtorsContext';
import { CustomersProvider } from 'context/CustomersContext';
import { CustomersFindProvider } from 'context/CustomersFindContext';
import { PropertiesProvider } from 'context/PropertiesContext';
import { OrdersProvider } from 'context/OrdersContext';
import { SharedProvider } from 'context/SharedContext';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SharedProvider>
					<UsersProvider>
						<PropertiesProvider>
							<OrdersProvider>
								<CustomersProvider>
									<CustomersFindProvider>
										<RealtorsProvider>
											<App />
										</RealtorsProvider>
									</CustomersFindProvider>
								</CustomersProvider>
							</OrdersProvider>
						</PropertiesProvider>
					</UsersProvider>
				</SharedProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
