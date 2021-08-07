import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { Log } from '../interfaces'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  logs: Log[]
}

const LineChart = ({ logs }: Props) => {
  const created: string[] = []
  const temperature: number[] = []
  const humidity: number[] = []

  if (logs) {
    logs.forEach((l) => {
      created.push(l.created)
      temperature.push(l.temperature)
      humidity.push(l.humidity)
    })
  }

  const options = {
    chart: {
      polar: true,
      type: 'line',
      events: {
        load: function () {
          this.showLoading()
          setTimeout(this.hideLoading.bind(this), 1000)
        },
        redraw: function () {
          this.showLoading()
          setTimeout(this.hideLoading.bind(this), 1000)
        }
      }
    },

    accessibility: {
      description:
        'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
      text: '気温と湿度',
      x: -80
    },

    pane: {
      size: '80%'
    },

    loading: {
      hideDuration: 1000,
      showDuration: 1000
    },

    xAxis: {
      categories: created,
      tickmarkPlacement: 'on',
      lineWidth: 0
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
    },

    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.1f}</b><br/>'
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },

    series: [
      {
        name: '気温',
        data: temperature,
        pointPlacement: 'on',
        color: '#ff3300'
      },
      {
        name: '湿度',
        data: humidity,
        pointPlacement: 'on',
        color: '#33ccff'
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            pane: {
              size: '70%'
            }
          }
        }
      ]
    },
    exporting: { enabled: false },
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default LineChart
