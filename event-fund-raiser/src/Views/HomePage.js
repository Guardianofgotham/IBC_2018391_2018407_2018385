import React, {useEffect} from 'react'
import web3 from '../web3';
import {useHistory } from 'react-router-dom';

function HomePage() {
	let history = useHistory();

	useEffect(() => {
		if (web3 === undefined)
			history.push("/MetaMaskError", { error: "Web3 not configured" })
	}, [])

	return (
		<div>
			<h1>This is homepage</h1>
		</div>
	)
}

export default HomePage
