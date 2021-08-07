import { NextApiRequest, NextApiResponse } from 'next'
import FetchLogsFromDynamoDb from '../../repositories/FetchLogsFromDynamoDb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  const results = await FetchLogsFromDynamoDb()
  res.status(200).json({ data: { logs: results.logs }})
}

export default handler
