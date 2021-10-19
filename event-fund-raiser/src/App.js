import React from 'react';
import web3 from './web3';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import MetaMaskError from './Views/MetaMaskError';
import NotFound from './Views/NotFound';
import HomePage from './Views/HomePage';


function App() {

	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/MetaMaskError" component={MetaMaskError} />
					<Route path="/Notfound" component={NotFound} />
					<Route path="/" component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
