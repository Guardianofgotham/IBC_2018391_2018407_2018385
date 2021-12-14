import React,{useState} from 'react'
import Box from '@mui/material/Box'
import { TextField, Button, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import event from '../ethereum/event';
import EventsDisplay from '../Components/EventsDisplay';

function SearchEvent({user}) {

	const [address, setAddress] = useState("")
	const [searched, setSearched] = useState(false)

	async function handleSearch()
	{
		setSearched(false);
		setSearched(true);
	}

	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="30vh"
				textAlign="center"
				marginX='20%'
				flexDirection='column'
				alignSelf='center'
			>
				<TextField
					autoFocus
					margin="dense"
					id="description"
					label={`Enter Contract Address`}
					type="text"
					fullWidth
					value={address}
					onChange={(e) => {
						setSearched(false);
						setAddress(e.target.value);
					}}
					InputProps={{
								endAdornment: <IconButton onClick={handleSearch}>
									<SearchIcon />
								</IconButton>
							}}
				/>
			</Box>
			{searched && <EventsDisplay user={user} refreshEventList={handleSearch} eventAddresses={[address]} />}
		</div>
	)
}

export default SearchEvent
