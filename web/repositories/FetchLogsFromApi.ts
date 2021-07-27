import { Log } from '../interfaces'

export const FetchLogsFromApi = async (): Promise<Log[]> => {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query: '{ logs { created temperature humidity } }' }),
  })

  const res = await response.json()
  const logs: Log[] = res.data.logs.map((element, index, array) => {
    return {
      created: element.created,
      temperature: Number(element.temperature) > 100 ? 0 : Number(element.temperature),
      humidity: Number(element.humidity) > 100 ? 0 : Number(element.humidity),
    }
  })

  return logs
}

export default FetchLogsFromApi