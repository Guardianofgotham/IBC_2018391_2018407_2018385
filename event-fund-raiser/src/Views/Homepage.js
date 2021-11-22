import React, { useState, useEffect } from 'react'
import EventsDisplay from '../Components/EventsDisplay'
import factory from '../ethereum/factory'

function Homepage({ user }) {

	const [eventAddresses, setEventAddresses] = useState([])

	useEffect(async () => {
		refreshEventList()
	}, [])

	async function refreshEventList() {
		const eventsList = await factory.methods.getEvents().call();
		setEventAddresses([])
		setEventAddresses(eventsList)

	}

	return (
		<div>
			<EventsDisplay
				refreshEventList={refreshEventList}
				user={user}
				eventAddresses={eventAddresses} />
		</div>
	)
}

export default Homepage
