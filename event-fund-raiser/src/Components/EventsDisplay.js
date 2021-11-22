import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EventCard from './EventCard'


function EventsDisplay({ eventAddresses, user, refreshEventList }) {
	return (
		<div>
			{/* <List style={{flex:1, width: "100%"}}> */}
				{eventAddresses.map((eventAddress) =><EventCard refreshEventList={refreshEventList} user={user} eventAddress={eventAddress} />				)}
			{/* </List> */}
		</div>
	)
}

export default EventsDisplay
