import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Web3 from "web3";

import { contractJsonInterface } from "./contract";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20vh;
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const TRUFFLE_DEV_CHAIN_HOST = "http://localhost:9545/";

// Only tested with metamask so far
const useEth = (contractAddress: string) => {
  const [eth] = React.useState(() => {
    if (window.ethereum) {
      /* @ts-ignore TODO fix types */
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    return window.web3.eth;
  });
  const [accounts, setAccounts] = React.useState<string[]>([]);
  const [contract, setContract] = React.useState<InitialContract>();

  // This effect updates current account
  // Metamask does not return list, only active account
  React.useEffect(
    () => window.ethereum.on("accountsChanged", (x) => setAccounts(x)),
    []
  );
  // Make sure to get address of currently selected account
  // Also set reference to contract so we can interact with it
  React.useEffect(() => {
    eth.requestAccounts().then(setAccounts);
    const myContract = new eth.Contract(contractJsonInterface, contractAddress);
    setContract(myContract);
  }, [eth]);

  return { eth, accounts, contract };
};

export const Main = () => {
  // TODO: Make this more dynamic
  // Currently you have to deploy the contract, get its address and hardcode items
  // as parameter when calling the useEth hook
  const { eth, accounts, contract } = useEth(
    "0x07585E99bBDB4C7f68CA276F8c124EF07686A37c"
  );
  return (
    <Root>
      <Container>
        <Button
          onClick={() =>
            contract?.methods
              .setValue(1)
              .send({ from: accounts[0] || "NO_ACCOUNT" })
          }
        >
          Set 1
        </Button>
        <Button
          onClick={() =>
            contract?.methods
              .setValue(2)
              .send({ from: accounts[0] || "NO_ACCOUNT" })
          }
        >
          Set 2
        </Button>
        <Button onClick={() => contract?.methods.getValue().call().then(alert)}>
          Get Value
        </Button>
      </Container>
      <Container>
        <b>Current public address: </b>
        {accounts.map((x, i) => (
          <>{x}</>
        ))}
      </Container>
    </Root>
  );
};

render(<Main />, document.body);
