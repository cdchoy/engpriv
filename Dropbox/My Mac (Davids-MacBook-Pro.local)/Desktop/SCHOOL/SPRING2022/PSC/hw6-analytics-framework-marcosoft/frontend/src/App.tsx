import Handlebars from 'handlebars'
import { Component } from 'react'
import './App.css'
import { GeoVisPlugin } from './visPlugins/GeoVisPlugin'
import GoogleChartsPlugin from './visPlugins/GoogleChartsPlugin'

let oldHref = 'http://localhost:3000'

export interface Cell {
  locations: String[]
  sentiments: []
  text: String
}

interface Plugin {
  name: String
  link: String
}

interface GameState {
  name: String
  cells: Cell[]
  dataPlugins: Plugin[]
  visPlugins: Plugin[]
  template: HandlebarsTemplateDelegate<any>
}

interface Props {
}

class App extends Component<Props, GameState> {
  visPlugins: GeoVisPlugin[]
  currVisPlugin: GeoVisPlugin

  constructor (props: Props) {
    super(props)
    this.currVisPlugin = new GoogleChartsPlugin()
    this.visPlugins = new Array<GeoVisPlugin>()
    this.state = {
      template: this.loadTemplate(),
      cells: [
        { text: '', sentiments: [], locations: [] }
      ],
      name: 'Geo-Visualization Framework',
      dataPlugins: [
        { name: 'Load Data Plugins', link: '/start' }
      ],
      visPlugins: [
        { name: 'Load Visualization Plugins', link: '/start' }
      ]
    }
  }

  loadTemplate (): HandlebarsTemplateDelegate<any> {
    const src = document.getElementById('handlebars')
    return Handlebars.compile(src?.innerHTML, {})
  }

  convertToCell (p: any): Cell[] {
    const newCells: Cell[] = []
    for (let i = 0; i < p.cells.length; i++) {
      const c: Cell = {
        // Could potentially be wrong, converting string to array of strings.
        locations: p.cells[i].locations,
        sentiments: p.cells[i].sentiments,
        text: p.cells[i].text
      }
      newCells.push(c)
    }

    return newCells
  }

  convertToDataPlugin (p: any): Plugin[] {
    const newPlugins: Plugin[] = []
    for (let i = 0; i < p['data-plugins'].length; i++) {
      const plug: Plugin = {
        name: p['data-plugins'][i].name,
        link: p['data-plugins'][i].link
      }
      newPlugins.push(plug)
    }

    return newPlugins
  }

  convertToVisPlugin (p: any): Plugin[] {
    const newPlugins: Plugin[] = []
    for (let i = 0; i < p['vis-plugins'].length; i++) {
      const plug: Plugin = {
        name: p['vis-plugins'][i].name,
        link: p['vis-plugins'][i].link
      }
      newPlugins.push(plug)
    }

    return newPlugins
  }

  async start () {
    const href = 'start'
    const response = await fetch(href)

    const json = await response.json()
    const newDataPlugins: Plugin[] = this.convertToDataPlugin(json)

    for (const i in newDataPlugins) {
      console.log(newDataPlugins[i].name)
    }

    console.log(json)
    // const newVisPlugins: Array<Plugin> = this.convertToVisPlugin(json);
    // this.setState({ dataPlugins: newDataPlugins, visPlugins: newVisPlugins})
    this.setState({ dataPlugins: newDataPlugins })
  }

  async play (url: String) {
    // const href = "play?" + url.split("?")[1];
    // document.getElementById('querycnt').addEventListener('input', function () {
    //   console.log("[ Getting querycnt value" + (this as HTMLInputElement).value  + " ]")
    // });
    const element = (document.getElementById('querycnt') as HTMLInputElement).value
    console.log('User entered ' + element)
    const href = 'play?x=war&y=100'
    const response = await fetch(href)
    const json = await response.json()

    // supposed to be the query count here
    const newCells: Cell[] = this.convertToCell(json)
    const newDataPlugins: Plugin[] = this.convertToDataPlugin(json)
    const newVisPlugins: Plugin[] = this.convertToVisPlugin(json)
    this.currVisPlugin.visualize(newCells)

    this.setState({ cells: newCells, dataPlugins: newDataPlugins, visPlugins: newVisPlugins, name: json.name })
  }

  async choosePlugin (url: String) {
    const href = 'plugin?' + url.split('?')[1]
    const response = await fetch(href)
    const json = await response.json()

    const newCells: Cell[] = this.convertToCell(json)
    const newDataPlugins: Plugin[] = this.convertToDataPlugin(json)
    const newVisPlugins: Plugin[] = this.convertToVisPlugin(json)
    this.setState({ cells: newCells, dataPlugins: newDataPlugins, visPlugins: newVisPlugins, name: json.name })
  }

  async switch () {
    if (
      window.location.href.split('?')[0] === 'http://localhost:3000/plugin' &&
        oldHref !== window.location.href
    ) {
      await this.choosePlugin(window.location.href)
      oldHref = window.location.href
    } else if (
      window.location.href.split('?')[0] === 'http://localhost:3000/play' &&
        oldHref !== window.location.href
    ) {
      await this.play(window.location.href)
      oldHref = window.location.href
    } else if (
      (window.location.href === 'http://localhost:3000/' ||
        window.location.href === 'http://localhost:3000/start') &&
        oldHref !== window.location.href
    ) {
      console.log('fuck2')
      await this.start()
      oldHref = window.location.href
    }
  };

  render () {
    this.switch()
    return (
      <div className='App'>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.template({
              name: this.state.name,
              cells: this.state.cells,
              dataPlugins: this.state.dataPlugins,
              visPlugins: this.state.visPlugins
            })
          }}
        />
      </div>
    )
  };
};

export default App
