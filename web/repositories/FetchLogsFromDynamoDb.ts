import * as AWS from 'aws-sdk'
import { Log } from '../interfaces'

type FetchLogsResult = {
  status: 'success' | 'error'
  message?: string | null
  logs: Log[]
}

const FetchLogsFromDynamoDb = async (): Promise<FetchLogsResult> => {
  AWS.config.update({region: 'ap-northeast-1'})
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

  const date = new Date()
  const after_seven_days = date.getTime() + 7 * 24 * 60 * 60 * 1000
  const before_one_hour = Math.floor((after_seven_days - 3600 * 1000) / 1000)
  const now = Math.floor(after_seven_days / 1000)

  const params = {
    ExpressionAttributeValues: {
      ':startDate': {N: '' + before_one_hour},
      ':endDate': {N: '' + now}
    },
    ExpressionAttributeNames: { "#timestamp": "timestamp" },
    FilterExpression: '#timestamp BETWEEN :startDate AND :endDate',
    ProjectionExpression: '#timestamp, created, temperature, humidity',
    TableName: process.env.DYNAMODB_TABLE_NAME,
  }

  const res: FetchLogsResult = {
    status: 'success',
    message: null,
    logs: []
  }

  try {
    const response = await ddb.scan(params).promise()
    const logs: Log[] = response.Items?.map((element, index, array) => {
      return {
        id: Number(element.timestamp.N),
        created: '' + element.created.S,
        temperature: Number(element.temperature.S),
        humidity: Number(element.humidity.S),
      }
    });

    if (logs) {
      res.logs = logs.sort((a, b) => a.id - b.id)
    } else {
      res.logs = []
    }
    return res
  } catch (e) {
    res.status = 'error'
    res.message = '' + e
    return res
  }
}

export default FetchLogsFromDynamoDb