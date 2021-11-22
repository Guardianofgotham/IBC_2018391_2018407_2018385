import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';
import event from '../ethereum/event'

export default function ContributionDialog({user, eventAddress, open, setOpen, eventDetails }) {
	const { _manager, _description, _numRequests, _contributorsCount, _totalAmountCollected, _remainingBalance, _minimumAmount, _eventEndDate } = eventDetails;
	const [amount, setAmount] = useState(Number(_minimumAmount));
	const [Loading, setLoading] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const makePayment = async () => {
		setLoading(true);
		const response  = await event(eventAddress).methods.pay().send({
			from: user,
			value: amount
		})
		console.log(response);
		setLoading(false);
		handleClose();
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Contribute To Event</DialogTitle>
				{Loading ? <CircularProgress style={{alignSelf: 'center', margin: 50}} /> :
					<div>
						<DialogContent>
							<DialogContentText>
								Do you want to contribute to Event?
								<br />
								Hosted at: {eventAddress}
								<br />
								Description: {_description}
								<br />
								Minimum Contribution: {Number(_minimumAmount)}
							</DialogContentText>
							<TextField
								// autoFocus
								margin="dense"
								id="name"
								label={`Ethers to pay (wei)`}
								type="number"
								fullWidth
								variant="standard"
								InputProps={{ inputProps: { min: Number(_minimumAmount) } }}
								value={amount}
								onChange={(event) => setAmount(Number(event.target.value))}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button disabled={amount < Number(_minimumAmount)} onClick={makePayment}>Pay</Button>
						</DialogActions>
					</div>
				}

			</Dialog>
		</div>
	);
}
