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

export default function CreateRequestDialog({refreshEventList, user, eventAddress, open, setOpen, eventDetails }) {
	const { _manager, _description, _numRequests, _contributorsCount, _totalAmountCollected, _remainingBalance, _minimumAmount, _eventEndDate } = eventDetails;
	const [Loading, setLoading] = useState(false);
	const [requestDetails, setRequestDetails] = useState({
		description: "",
		amountToTranfer: 1,
		receiverAddress: ""
	})

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreateRequest = async () => {
		setLoading(true);
		try {
			const response = await event(eventAddress).methods.createRequest(
				requestDetails.description,
				requestDetails.amountToTranfer,
				requestDetails.receiverAddress
			).send({
				from: user,
				value: 0
			})
			refreshEventList()
			console.log(response);
		}
		catch (e) {
			alert(e.message);
		}
		setLoading(false);
		handleClose();
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Request</DialogTitle>
				{Loading ? <CircularProgress style={{ alignSelf: 'center', margin: 50 }} /> :
					<div>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="description"
								label={`Description`}
								type="text"
								fullWidth
								variant="standard"
								value={requestDetails.description}
								onChange={(event) => setRequestDetails((prev) => ({ ...prev, description: event.target.value }))}
							/>
							<TextField
								margin="dense"
								id="description"
								label={`Receivers Address`}
								type="text"
								fullWidth
								variant="standard"
								value={requestDetails.receiverAddress}
								onChange={(event) => setRequestDetails((prev) => ({ ...prev, receiverAddress: event.target.value }))}
							/>
							<TextField
								margin="dense"
								id="amount"
								label={`Amount to transfer (wei)`}
								type="number"
								fullWidth
								variant="standard"
								InputProps={{ inputProps: { min: 1 } }}
								value={requestDetails.amountToTranfer}
								onChange={(event) => setRequestDetails((prev) => ({ ...prev, amountToTranfer: Math.max(1, Number(event.target.value)) }))}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button
								onClick={handleCreateRequest}
								disabled={requestDetails.description.length == 0 || requestDetails.receiverAddress.length == 0}>
								Create
							</Button>
						</DialogActions>
					</div>
				}

			</Dialog>
		</div>
	);
}
