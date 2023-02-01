import { Cell } from '../App'
import { GeoVisPlugin } from './GeoVisPlugin'

const script = document.createElement('script')
script.src = 'https://www.gstatic.com/charts/loader.js'
document.head.appendChild(script)

class GoogleChartsPlugin implements GeoVisPlugin {
  visualize (cells: Cell[]): void {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    })
    google.charts.setOnLoadCallback(drawRegionsMap)

    function drawRegionsMap () {
      const header = ['Country', 'Sentiment']
      const array = Object.values(cells)
      console.log(array)
      const map = new Map<String, number>()
      for (const i in cells) {
        let sent: number = 0
        const sentiments = cells[i].sentiments
        const locations = cells[i].locations
        for (const j in sentiments) {
          if (sentiments[j] === 'Positive') {
            sent += 1
          } else if (sentiments[i] === 'Neutral') {
            sent += 0
          } else if (sentiments[i] === 'Negative') {
            sent += -1
          }
        }
        for (const k in locations) {
          let curr: number = 0
          if (map.has(locations[k])) {
            curr = map.get(locations[k]) as number
          }
          map.set(locations[k], curr + sent)
        }
      }
      const chartsArray = []

      map.forEach((value: number, key: String) => {
        console.log(key, value)
        chartsArray.push([key, value])
      })

      chartsArray.unshift(header)

      console.log(chartsArray)
      console.log(google.visualization.arrayToDataTable(chartsArray))

      const dataTable = google.visualization.arrayToDataTable(chartsArray)
      console.log(dataTable)

      console.log('fuck')

      const options = {
        colorAxis: { colors: ['red', 'green'] }
      }

      const form = document.getElementById('board')
      console.log('fuck1')

      console.log(form)
      const chart = new google.visualization.GeoChart(form as HTMLFormElement)

      console.log('fuck2')
      console.log(chart)
      chart.draw(dataTable, options)
      console.log('fuck3')
    }
  }

  render () {
    return (
      GoogleChartsPlugin
    )
  };
}

export default GoogleChartsPlugin
