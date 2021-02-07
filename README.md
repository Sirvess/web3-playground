## What
Playground to experiment with Web3 and contract interaction on Ethereum.

Currently only set up for local environment, to run it:

1. `yarn install`
2. `yarn dev`
3. You may run `yarn truffle migrate` to deploy the contract to your local env. At time of writing you have to copy paste the address of the contract manually as parameter into the `useEth` hook inside `src/index.tsx`.  
