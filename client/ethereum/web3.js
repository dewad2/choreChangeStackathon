import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //see if we are running code in BROWSER (not server side), and if we are running metamask (it has already injected web3 and we can hijack its provider)
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/CzlPQ6ZcfUxjVCWgn7Gg"
  ); //create our own provider, pass in the url to the remote ethereum node we have access to through INFURA
  web3 = new Web3(provider);
}

export default web3;
