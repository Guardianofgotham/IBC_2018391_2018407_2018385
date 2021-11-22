import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, Button, Alert, CircularProgress } from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import factory from '../ethereum/factory'

function CreateEvent({user}) {
	const [Loading, setLoading] = useState(false)
	const [eventDetails, setEventDetails] = useState({
		description: "",
		minmAmount: 1,
		expiryDate: new Date()
	})

	async function handleEventCreation() {
		setLoading(true);
		try{
			const address = await factory.methods.createEvent(
				eventDetails.description,
				eventDetails.minmAmount,
				eventDetails.expiryDate.getTime()/1000
			).send({
				from: user,
				value: 0
			});
			console.log(address);
		}
		catch(e)
		{
			alert(e.message)
		}
		setLoading(false);
	}

	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="40vh"
				textAlign="center"
				marginX='40%'
				flexDirection='column'
			>
				<TextField
					autoFocus
					margin="dense"
					id="description"
					label={`Description`}
					type="text"
					fullWidth
					variant="standard"
					value={eventDetails.description}
					onChange={(e) => setEventDetails((prev) => ({ ...prev, description: e.target.value }))}
				/>
				<br />
				<TextField
					margin="dense"
					id="amount"
					label={`Minimum amount`}
					type="number"
					fullWidth
					variant="standard"
					InputProps={{ inputProps: { min: 1 } }}
					value={eventDetails.minmAmount}
					onChange={(e) => setEventDetails((prev) => ({ ...prev, minmAmount: Math.max(1, Number(e.target.value)) }))}
				/>
				<br />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePicker
						renderInput={(params) => <TextField {...params} />}
						value={eventDetails.expiryDate}
						minDateTime={new Date()}
						onChange={(newValue) => {
							setEventDetails((prev) => ({ ...prev, expiryDate: newValue }))
						}}
					/>
				</LocalizationProvider>
				<br />
				{Loading ? <CircularProgress />: <Button disabled={eventDetails.description.length==0} onClick={handleEventCreation}>Create Event</Button>}
			</Box>
		</div>
	)
}

export default CreateEvent
