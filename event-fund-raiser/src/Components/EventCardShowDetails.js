import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ContributionDialog from './ContributionDialog';


export default function EventCardShowDetails({user, isContributor, eventDetails, eventAddress }) {
	const [open, setOpen] = useState(false);
	const { _manager, _description, _numRequests, _contributorsCount, _totalAmountCollected, _remainingBalance, _minimumAmount, _eventEndDate } = eventDetails;

	return (
		<Card variant="outlined" sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Managed By: {_manager}
				</Typography>
				<Typography variant="h5" component="div">
					{_description}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Event Address: {eventAddress}
				</Typography>
				<Typography variant="body2">
					<List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
						<ListItem>
							<RequestPageIcon /> {_numRequests}
						</ListItem>
						<ListItem>
							<GroupIcon /> {_contributorsCount}
						</ListItem>
						<ListItem>
							<MonetizationOnIcon /> {_totalAmountCollected}
						</ListItem>
						<ListItem>
							<AccountBalanceIcon /> {_remainingBalance}
						</ListItem>
						<ListItem>
							<AttachMoneyIcon /> {_minimumAmount}
						</ListItem>
						<ListItem>
							<DateRangeIcon /> {(new Date(_eventEndDate*1000)).toUTCString()}
						</ListItem>
					</List>



				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={()=>setOpen(true)} size="small">Contribute</Button>
				<Button disabled={!isContributor} size="small">Show Requests</Button>
			</CardActions>
			<ContributionDialog user={user} eventDetails={eventDetails} eventAddress={eventAddress} open={open} setOpen={setOpen} />
		</Card>
	);
}
