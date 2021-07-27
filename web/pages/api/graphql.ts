import { NextApiRequest, NextApiResponse } from 'next'
// import { ApolloServer, gql } from 'apollo-server-lambda'
// import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import FetchLogsFromDynamoDb from '../../repositories/FetchLogsFromDynamoDb'
// require('ts-tiny-invariant')

// const typeDefs = gql`
//   type Query {
//     logs: [Log!]!
//   }
//   type Log {
//     created: String!
//     temperature: Float!
//     humidity: Float!
//   }
// `
//
// const resolvers = {
//   Query: {
//     logs: async () => {
//       const res = await FetchLogsFromDynamoDb()
//       console.log(res)
//       return res.logs
//     }
//   }
// }
//
// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers
// })
//  plugins: [ApolloServerPluginLandingPageDisabled()]
// const startServer = apolloServer.start()
// const startServer = apolloServer

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  const results = await FetchLogsFromDynamoDb()
  res.status(200).json({ data: { logs: results.logs }})
  // res.setHeader(
  //   'Access-Control-Allow-Origin',
  //   'https://studio.apollographql.com'
  // )
  //
  // await startServer
  // await apolloServer.createHandler({
  //   path: '/api/graphql',
  // })(req, res)
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export default handler
