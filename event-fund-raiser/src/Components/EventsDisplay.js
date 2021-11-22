import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EventCard from './EventCard'


function EventsDisplay({ eventAddresses, user }) {
	return (
		<div>
			{/* <List style={{flex:1, width: "100%"}}> */}
				{eventAddresses.map((eventAddress) =><EventCard user={user} eventAddress={eventAddress} />				)}
			{/* </List> */}
		</div>
	)
}

export default EventsDisplay
