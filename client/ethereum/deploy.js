const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledChoreChart = require("./build/ChoreChart.json"); //the compiled chorechart

const provider = new HDWalletProvider( //connect to a network, and unlock an account on that network
  "guard alert banner unfold advance coach near crime wing kit fatigue thank", //metamask account mneumonic
  "https://rinkeby.infura.io/CzlPQ6ZcfUxjVCWgn7Gg" //link to deploy to from infura (so don't need to host nodes on local machine)
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("trying to deploy from account-----", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledChoreChart.interface)
  ) //interface is the ABI
    .deploy({ data: compiledChoreChart.bytecode, arguments: [accounts[0]] })
    .send({ gas: "1000000", from: accounts[0] });
  //result is an instance of our contract

  console.log("Contract deployed to", result.options.address);
};
deploy().catch(err => console.error(err));
