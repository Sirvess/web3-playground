import Web3 from "web3";
import { Contract, ContractSendMethod } from "web3-eth-contract";

declare global {
  interface Window {
    ethereum: {
      // This function asks user whether to enable metamask
      enable: () => void;
      // TODO typings
      on: (s: string, handler: (s: any) => void) => void;
    };
    web3: Web3;
  }

  interface InitialContract extends Contract {
    methods: {
      set: (x: number) => Pick<ContractSendMethod, "send">;
      get: () => Pick<ContractSendMethod, "call">;
    };
  }
}
