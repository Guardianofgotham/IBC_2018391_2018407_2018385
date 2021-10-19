import Web3 from 'web3';

var web3 = undefined;

if (window !== undefined && window.web3 !== undefined && window.web3.currentProvider!==undefined)
	web3 = new Web3(window.web3.currentProvider);

export default web3;