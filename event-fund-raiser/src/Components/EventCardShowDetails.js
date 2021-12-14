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
import RequestsDialog from './RequestsDialog';
import CreateRequestDialog from './CreateRequestDialog';


export default function EventCardShowDetails({user, isContributor, eventDetails, eventAddress, refreshEventList }) {
	const [openContribution, setOpenContribution] = useState(false);
	const [openRequests, setOpenRequests] = useState(false);
	const [openCreateRequest, setOpenCreateRequest] = useState(false);

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
							<RequestPageIcon />  {_numRequests} Requests
						</ListItem>
						<ListItem>
							<GroupIcon /> {_contributorsCount} Contributors
						</ListItem>
						<ListItem>
							<MonetizationOnIcon /> {_totalAmountCollected} Collected (wei)
						</ListItem>
						<ListItem>
							<AccountBalanceIcon /> {_remainingBalance} Balance (wei)
						</ListItem>
						<ListItem>
							<AttachMoneyIcon /> {_minimumAmount} Min Cont (wei)
						</ListItem>
						<ListItem>
							<DateRangeIcon /> {(new Date(_eventEndDate*1000)).toUTCString()} 
						</ListItem>
					</List>



				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={()=>setOpenContribution(true)} size="small">Contribute</Button>
				<Button disabled={!isContributor} onClick={()=>setOpenRequests(true)} size="small">Show Requests</Button>
				{
					_manager.toLowerCase()===user && 
					<Button onClick={()=>setOpenCreateRequest(true)}> Create Request </Button>
				}
			</CardActions>
			<ContributionDialog refreshEventList={refreshEventList} user={user} eventDetails={eventDetails} eventAddress={eventAddress} open={openContribution} setOpen={setOpenContribution} />
			<RequestsDialog refreshEventList={refreshEventList} open={openRequests} setOpen={setOpenRequests} user={user} eventDetails={eventDetails} eventAddress={eventAddress} />
			<CreateRequestDialog refreshEventList={refreshEventList} open={openCreateRequest} setOpen={setOpenCreateRequest} user={user} eventDetails={eventDetails} eventAddress={eventAddress} />
		</Card>
	);
}
