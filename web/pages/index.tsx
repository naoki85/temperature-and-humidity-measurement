import Layout from '../components/Layout'
import LineChart from '../components/LineChart'
import FetchLogsFromApi from '../repositories/FetchLogsFromApi'
import { useEffect, useState } from 'react'
import { Log } from '../interfaces'

const IndexPage = () => {
  const [logs, SetLogs] = useState<Log[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const fetched = await FetchLogsFromApi()
      SetLogs(fetched)
    }
    fetchLogs()
    const interval = setInterval(fetchLogs, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout title="ウチの気温と湿度">
      <h1>ウチの気温と湿度</h1>
      <LineChart logs={logs}/>
    </Layout>
  )
}

export default IndexPage
