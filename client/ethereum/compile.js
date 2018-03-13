const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //delete build folder, which we will rebuild at the end. so we only have one up to date compiled version.

const chorechangePath = path.resolve(__dirname, "contracts", "Chorechange.sol");
const source = fs.readFileSync(chorechangePath, "utf8"); //contents of the chorechange file
const output = solc.compile(source, 1).contracts; //compile all those contents, and pull off the contracts property

console.log("output!!!!", output);

fs.ensureDirSync(buildPath); //re-create build folder

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  ); //where we want the file to be created //this argument is the content we want to write to the Json file
}
