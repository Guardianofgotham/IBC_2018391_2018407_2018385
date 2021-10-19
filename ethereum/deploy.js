const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const eventFactory = require('./build/EventFactory.json');

const provider = new HDWalletProvider(
	'patch liberty giraffe hamster marriage slam pole bar tell alert fork habit',
	'https://rinkeby.infura.io/v3/62dc02ca769146bb9ea57ae6bbff9986'
)

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log(`deploying from: ${accounts[0]}`)
	const result = await new web3.eth.Contract(eventFactory.abi)
	.deploy({
		data: eventFactory.evm.bytecode.object,
		arguments: ['hello hardik'],
	})
	.send({
		gas: '10000000',
		from: accounts[0]
	});
	console.log(`deployed at ${result.options.address}`);
}

deploy();

// console.log(eventFactory);