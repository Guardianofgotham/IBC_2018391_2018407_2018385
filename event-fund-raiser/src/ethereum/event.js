import web3 from './web3'
import { abi } from './build/Event.json'

// const address='0xffdF12512eC42CE36fD47439F667b97ccD1cAef1'//deploy
function event(address) {
	return	new web3.eth.Contract(abi, address);
}

export default event;