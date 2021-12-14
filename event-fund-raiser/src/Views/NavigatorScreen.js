import React, { useEffect, useState } from 'react'
import web3 from '../ethereum/web3';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header'
import CONSTANTS from '../CONSTANTS';
import Homepage from './Homepage';
import CreateEvent from './CreateEvent';
import SearchEvent from './SearchEvent';

function NavigatorScreen() {
	let history = useHistory();

	const [currentScreenName, setCurrentScreenName] = useState(CONSTANTS.SCREENS.Homepage);
	const [user, setUser] = useState(undefined)

	useEffect(async () => {
		if (web3 === undefined)
			history.push("/MetaMaskError", { error: "Web3 not configured" })
		else
		{
			try{
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				setUser(accounts[0].toLowerCase());
			}
			catch (e)
			{
				history.push("/MetaMaskError", { error: e.message })
			}
		}
	}, [])

	// async function test() {
	// 	const data = await event("0x1c294302dfD96A70BF7678c4709E150f922703b9").methods.getEventDetails().call()
	// 	console.log(data)
	// }


	return (
		<div>
			<Header user={user} setCurrentScreenName={setCurrentScreenName} />
			<div>
				{screenHandler(user, currentScreenName, setCurrentScreenName)}
			</div>
		</div>
	)
}

function screenHandler(user ,currentScreenName, setCurrentScreenName)
{
	switch(currentScreenName) {
		case CONSTANTS.SCREENS.Homepage:
			return <Homepage user={user} />
		case CONSTANTS.SCREENS.CreateEvent:
			return <CreateEvent user={user} />
		case CONSTANTS.SCREENS.SearchEvent:
			return <SearchEvent user={user} />
	}
}

//HANDLE METAMASK ERROR

// class HomePage extends Component {
// 	state = {
// 		data: []
// 	}
// 	async componentDidMount() {
// 		const events = await factory.methods.getEvents().call();

// 		console.log(events);
// 		this.setState({ data: events });
// 	}

// 	renderEvents() {
// 		const items = this.state.data.map(address => {
// 			return {
// 				header: address,
// 				description: <a>View Events</a>,
// 				fluid: true
// 			}
// 		});
// 		return <Card.Group items={items} />
// 		// return <MultiActionAreaCard />;
// 	}

// 	render() {
// 		// console.log(this.state.thisevent);
// 		// const {event} = this.props;

// 		return (
// 			<div>
// 				<Header />
// 				<div>
// 					<h3>Open Events</h3>
// 					<Button floated="right" content="Create Event" icon="add" primary={true} />
// 					{this.renderEvents()}
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default NavigatorScreen
