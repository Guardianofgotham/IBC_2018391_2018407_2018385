import web3 from './web3'
import EventFactory from './build/EventFactory.json'
import { abi } from './build/EventFactory.json'

// const address='0xffdF12512eC42CE36fD47439F667b97ccD1cAef1'//deploy
const instance = new web3.eth.Contract(abi,'0x6889039b425B30E031bEF41054F2049DaF13A422');

export default instance;