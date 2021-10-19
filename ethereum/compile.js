const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const eventPath = path.resolve(__dirname, 'contracts', 'Event.sol');
const source = fs.readFileSync(eventPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Event': {content : source}
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "abi", "evm.bytecode.object" ]
            }
        }
    }
};


const compiled = JSON.parse(solc.compile(JSON.stringify(input)))
const output = compiled.contracts['Event']
// console.log(output)

fs.ensureDirSync(buildPath);

for (let contract in output) {
	console.log(contract)
	fs.outputJsonSync(
		path.resolve(buildPath, contract+'.json'),
		output[contract]
	);
}

