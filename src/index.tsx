import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";

import { CONTRACT_ADDRESS } from "../env";
import { useWeb3Account, useGetterSetterContract } from "./hooks";

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

export const Main = () => {
  const { contract } = useGetterSetterContract(CONTRACT_ADDRESS);
  const { accounts } = useWeb3Account();
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
        {accounts.map((x, _) => (
          <>{x}</>
        ))}
      </Container>
    </Root>
  );
};

render(<Main />, document.body);
