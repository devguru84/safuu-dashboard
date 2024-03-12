// constants
// import Web3EthContract from "web3-eth-contract";
// import Web3 from "web3";
import { ethers } from "ethers";
// import { axios } from "axios";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const startupSuccess = (payload) => {
  return {
    type: "STARTUP_SUCCESS",
    payload: payload,
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner().getAddress();
    console.log(signer);
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      // Web3EthContract.setProvider(ethereum);
      // let web3 = new Web3(ethereum);

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          // const SmartContractObj = new Web3EthContract(
          //   abi,
          //   CONFIG.CONTRACT_ADDRESS
          // );
          const myContract = new ethers.Contract(
            CONFIG.CONTRACT_ADDRESS,
            abi,
            provider
          );
          const myBalance = await myContract.balanceOf(accounts[0]);
          console.log("account[0]", accounts[0]);
          dispatch(
            connectSuccess({
              account: signer,
              smartContract: myContract,
              connected: true,
              myBalance: myBalance.toString(),
              // web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const startUp = () => {
  // const data = async () => {
  //   let response = fetch(
  //     "https://api.pancakeswap.info/api/v2/tokens/0xB448BD91B733F406fF3C8445c9035FdC64D6c8d4"
  //   );
  //   console.log("response", response);
  //   let result = await response.json();
  //   return result;
  // };
  const getJSONP = async (url) => {
    let data = await (await fetch(url)).json();
    return data;
  };
  return async (dispatch) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    );
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const myContract = new ethers.Contract(
      CONFIG.CONTRACT_ADDRESS,
      abi,
      provider
    );
    const totalSupply = await myContract.totalSupply();
    // console.log("total = ", totalSupply.toString());
    const treasuryaddress = await myContract.treasuryReceiver();
    // console.log("treasuryaddress = ", treasuryaddress);
    const treasury = await myContract.balanceOf(treasuryaddress);
    // console.log("treasurybalance = ", treasury.toString());
    const deadaddress = "0x000000000000000000000000000000000000dEaD";
    const dead = await myContract.balanceOf(deadaddress);
    // console.log("deadbalance = ", dead.toString());
    const insuranceaddress = await myContract.SuuperInsuranceFundReceiver();
    const insurance = await myContract.balanceOf(insuranceaddress);
    const launchtime = await myContract._lastRebasedTime();
    console.log("lauchtime", launchtime.toString());
    // console.log("insurancebalance = ", insurance.toString());
    const price = await getJSONP(
      "https://api.pancakeswap.info/api/v2/tokens/0xE5bA47fD94CB645ba4119222e34fB33F59C7CD90"
    );
    // console.log("price", price.data.price);
    // const pair = await getJSONP("")
    dispatch(
      startupSuccess({
        totalSupply: totalSupply.toString(),
        treasury: treasury.toString(),
        insurance: insurance.toString(),
        // deadbalance:
        price: price.data.price,
        dead: dead.toString(),
        launchtime: launchtime.toString(),
      })
    );
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
