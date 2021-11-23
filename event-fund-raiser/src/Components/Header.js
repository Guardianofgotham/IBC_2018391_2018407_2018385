import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CONSTANTS from '../CONSTANTS';

export default function Header({user, setCurrentScreenName}) {
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = (screenName) => {
		setCurrentScreenName(screenName);
		handleClose();
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography onClick={() => handleClick(CONSTANTS.SCREENS.Homepage)} variant="h6" component="div" sx={{ flexGrow: 1 }}>
						EthEvents
					</Typography>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							
							{user && <MenuItem disabled onClick={handleClose}>Account: {user.slice(0, 8)}</MenuItem>}
							<MenuItem onClick={() => handleClick(CONSTANTS.SCREENS.SearchEvent)}>Search Event</MenuItem>
							<MenuItem onClick={() => handleClick(CONSTANTS.SCREENS.CreateEvent)}>Create Event</MenuItem>
							
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
