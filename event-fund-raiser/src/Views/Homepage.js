import React,{useState, useEffect} from 'react'
import EventsDisplay from '../Components/EventsDisplay'
import factory from '../ethereum/factory'

function Homepage({user}) {

	const [eventAddresses, setEventAddresses] = useState([])

	useEffect(async () => {
		const eventsList = await factory.methods.getEvents().call();
		setEventAddresses(eventsList)
	}, [])

	return (
		<div>
			<EventsDisplay user={user} eventAddresses={eventAddresses} />
		</div>
	)
}

export default Homepage
