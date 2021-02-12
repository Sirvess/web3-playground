import * as React from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { erc20baicInterface, gettersetterInterface } from "./contracts";

type ContractConfig = {
  contractAddress: string;
  contractInterface: AbiItem[];
};

export const useWeb3 = () => {
  const [eth] = React.useState(() => {
    if (window.ethereum) {
      /* @ts-ignore TODO fix types */
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    return window.web3.eth;
  });
  return eth;
};

export const useWeb3Account = () => {
  const eth = useWeb3();
  const [accounts, setAccounts] = React.useState<string[]>([]);
  // This effect updates current account
  // Metamask does not return list, only active account
  React.useEffect(
    () => window.ethereum.on("accountsChanged", (x) => setAccounts(x)),
    []
  );
  // Make sure to get address of currently selected account
  React.useEffect(() => {
    eth.requestAccounts().then(setAccounts);
  }, [eth]);
  return { accounts };
};

// Only tested with metamask so far
const useWeb3Contract = ({
  contractAddress,
  contractInterface,
}: ContractConfig) => {
  const eth = useWeb3();
  const [contract, setContract] = React.useState<InitialContract>();

  // Also set reference to contract so we can interact with it
  React.useEffect(() => {
    const myContract = new eth.Contract(contractInterface, contractAddress);
    setContract(myContract);
  }, [eth]);

  return { contract };
};

export const useGetterSetterContract = (
  contractAddress: ContractConfig["contractAddress"]
) =>
  useWeb3Contract({
    contractAddress,
    contractInterface: gettersetterInterface,
  });

export const useERC20Contract = (
  contractAddress: ContractConfig["contractAddress"]
) =>
  useWeb3Contract({
    contractAddress,
    contractInterface: erc20baicInterface,
  });
