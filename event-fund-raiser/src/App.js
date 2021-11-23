import React from 'react';
import web3 from './ethereum/web3';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import MetaMaskError from './Views/MetaMaskError';
import NotFound from './Views/NotFound';
import NavigatorScreen from './Views/NavigatorScreen';


function App() {

	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/MetaMaskError" component={MetaMaskError} />
					<Route path="/Notfound" component={NotFound} />
					<Route path="/" component={NavigatorScreen} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
