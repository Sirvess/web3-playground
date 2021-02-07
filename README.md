## What
Playground to experiment with Web3 and contract interaction on Ethereum.

Currently only set up for local environment, to run it:

1. `yarn install`
2. `yarn dev`
3. You may run `yarn truffle migrate` to deploy the contract to your local env. At time of writing you have to copy paste the address of the contract manually and put it into `env.ts`

You might also have to set up Metamask for local development. You could follow [this guide](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-Network-RPC-and-or-Block-Explorer) for how to add a local RPC.
