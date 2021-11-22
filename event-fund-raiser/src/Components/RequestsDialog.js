import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import event from '../ethereum/event';
import { CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function RequestsDialog({refreshEventList, open, setOpen, user, eventDetails, eventAddress }) {
	const { _manager, _numRequests, _contributorsCount, _totalAmountCollected, _remainingBalance, _minimumAmount, _eventEndDate } = eventDetails;
	const [Loading, setLoading] = useState(false)
	const [requests, setRequests] = useState([])

	useEffect(() => {
		refreshValues()
	}, [open])

	function refreshValues(){
		setRequests([]);
		for (var i = 0; i < _numRequests; i++) {
			const index = i;
			event(eventAddress).methods.requests(index).call().then((result) => {
				setRequests((prev) => [...prev, { index, result }])
				console.log(result);
			});
		}
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		refreshEventList()
	};

	const handleApproval = async (index) => {
		setLoading(true);
		try {
			const response = await event(eventAddress).methods.approveRequest(index).send({
				from: user,
				value: 0
			})
		}
		catch (e) {
			alert(e.message);
		}
		refreshValues()
		setLoading(false);
	}

	const handleFinalize = async (index) => {
		setLoading(true);
		try {
			const response = await event(eventAddress).methods.finalize(index).send({
				from: user,
				value: 0
			})
			refreshValues();
			
		}
		catch (e) {
			alert(e.message);
		}
		setLoading(false);
	}

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Requests at event {eventAddress}
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Done
						</Button>
					</Toolbar>
				</AppBar>
				{
					Loading ? <CircularProgress style={{alignSelf: 'center'}} /> : <div>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center">Description</TableCell>
									<TableCell align="center">Amount</TableCell>
									<TableCell align="center">To</TableCell>
									<TableCell align="center">#Approvers</TableCell>
									<TableCell align="center">Status</TableCell>
									<TableCell align="center">Approve</TableCell>
									<TableCell align="center">Finalize</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									requests.map((request) => {
										const { description, amount, to, approversCount, finalized } = request.result;
										const { index } = request;
										return (
											<TableRow>
												<TableCell align="center">{description}</TableCell>
												<TableCell align="center">{amount}</TableCell>
												<TableCell align="center">{to}</TableCell>
												<TableCell align="center">{approversCount}/{_contributorsCount}</TableCell>
												<TableCell align="center">{finalized ? "Done" : "Pending"}</TableCell>
												<TableCell align="center">
													<Button disabled={finalized} onClick={() => handleApproval(index)} color="secondary">
														Approve
													</Button>
												</TableCell>
												<TableCell align="center">
													<Button onClick={()=>handleFinalize(index)} disabled={finalized || approversCount <= (_contributorsCount / 2) || _manager.toLowerCase()!==user}>
														Finalize
													</Button>
												</TableCell>
											</TableRow>
										)
									})
								}
							</TableBody>
						</Table>
					</div>
				}


			</Dialog>
		</div>
	);
}
