module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*",
    },
  },
    compilers: {
        solc: {
            version: "0.6.0",
        }
    }
};
