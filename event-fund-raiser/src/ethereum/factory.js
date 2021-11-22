import web3 from './web3'
import { abi } from './build/EventFactory.json'

// const address='0xffdF12512eC42CE36fD47439F667b97ccD1cAef1'//deploy
const instance = new web3.eth.Contract(abi,'0x046aD9Fa9a4d5FDe7406EaF7eDb8e5E506A1602d');

export default instance;