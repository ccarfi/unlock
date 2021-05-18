const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: 'postgres',
  stripeSecret: process.env.STRIPE_SECRET,
  web3ProviderHost: process.env.WEB3_PROVIDER_HOST,
  unlockContractAddress: process.env.UNLOCK_CONTRACT_ADDRESS,
  defaultNetwork: process.env.DEFAULT_NETWORK,
  purchaserAddress: process.env.PURCHASER_ADDRESS,
  purchaserCredentails: process.env.PURCHASER_CREDENTIALS,
  graphQLBaseURL: process.env.GRAPHQL_BASE_URL,
  metadataHost: process.env.METADATA_HOST,
  logging: false,
  jaeger: {
    serviceName: 'locksmith',
    tags: [],
    port: 6832,
    maxPacketSize: 65000,
  },
}

module.exports = config
