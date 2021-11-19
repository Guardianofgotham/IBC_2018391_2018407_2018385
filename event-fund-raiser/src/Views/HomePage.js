import React, {useEffect,Component} from 'react'
import web3 from '../ethereum/web3';
import {useHistory } from 'react-router-dom';
import factory from '../ethereum/factory'
import {Card, Button} from 'semantic-ui-react';
import Layout from '../Components/Layout'
// import MultiActionAreaCard from '../Components/Card';

// function HomePage() {
// 	let history = useHistory();

// 	useEffect(() => {
// 		if (web3 === undefined)
// 			history.push("/MetaMaskError", { error: "Web3 not configured" })
// 	}, [])

// 	return (
// 		<div>
// 			<h1>This is homepage</h1>
// 		</div>
// 	)
// }

//HANDLE METAMASK ERROR

class HomePage extends Component {
	state ={
		data:[]
	}
	async componentDidMount() {
		const events = await factory.methods.getEvents().call();
		
		// const event=events[0];
		console.log(events);
		// this.setState({ x: event }) 
		this.setState({ data : events });
	}

	renderEvents() {
		const items=this.state.data.map(address => {
			return {
				header: address,
				description: <a>View Events</a>,
				fluid:true
			}
		});
		return <Card.Group items={items} />
		// return <MultiActionAreaCard />;
	}

	render() {
		// console.log(this.state.thisevent);
		// const {event} = this.props;

		return (
		<Layout>
		<div>
		<h3>Open Events</h3>	
		
		<Button floated="right" content="Create Event" icon="add" primary={true} />
		{this.renderEvents()}
		</div>
		</Layout>
		);
	}
}

export default HomePage
