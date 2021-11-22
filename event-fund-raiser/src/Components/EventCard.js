import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react'
import event from '../ethereum/event'
import EventCardShowDetails from "./EventCardShowDetails"


function EventCard({ eventAddress, user, refreshEventList }) {
	const [eventDetails, setEventDetails] = useState(undefined);
	const [isContributor, setIsContributor] = useState(false);

	useEffect(async () => {
		const data = await event(eventAddress).methods.getEventDetails().call()
		setEventDetails(data);
		const contributionStatus = await event(eventAddress).methods.isContributor(user).call() || data._manager.toLowerCase() === user;
		console.log(user, data._manager)
		setIsContributor(contributionStatus);
	}, [])

	return (
		<div style={{margin: 10}} >
			<h1>
				{
					eventDetails === undefined ? <div>
						<CircularProgress /> Getting details from {eventAddress}
						</div >:
						<EventCardShowDetails refreshEventList={refreshEventList} user={user} isContributor={isContributor} eventAddress={eventAddress} eventDetails={eventDetails} />
				}
			</h1>
		</div>
	)
}

export default EventCard
