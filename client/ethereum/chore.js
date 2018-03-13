import web3 from "./web3";
import ChoreChart from "./build/ChoreChart.json";

const instance = new web3.eth.Contract(
  JSON.parse(ChoreChart.interface),
  "0xE583bC590BB2e7757e91E23d2679C99B4DD0eD95"
);

export default instance;
