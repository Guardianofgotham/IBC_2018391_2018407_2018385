import React from 'react'
import EventCard from './EventCard'


function EventsDisplay({ eventAddresses, user, refreshEventList }) {
	console.log(eventAddresses)
	return (
		<div>
			{/* <List style={{flex:1, width: "100%"}}> */}
				{eventAddresses.map((eventAddress) =><EventCard refreshEventList={refreshEventList} user={user} eventAddress={eventAddress} />				)}
			{/* </List> */}
		</div>
	)
}

export default EventsDisplay
