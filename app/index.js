import { data_url } from '../config'
import { getMap } from './load-map'
import { renderData } from './render-data'

const d3 = require('d3')
const map = getMap()

let container = document.createElement('div')
container.id = container.className = 'container'
container.appendChild(map)

let mapWidth = d3.select(map).attr('width')
let mapHeight = d3.select(map).attr('height')

let svg = d3
  .select(container)
  .append('svg')
  .attr('viewBox', `0 0 ${mapWidth} ${mapHeight}`)
  .attr('class', 'overlay')

svg
  .append('text')
  .text('Meteorite Landings')
  .attr('text-anchor', 'middle')
  .attr('x', mapWidth / 2)
  .attr('y', 40)
  .attr('class', 'title')

d3.request(data_url)
  .get(renderData(container, svg, mapWidth, mapHeight))

document.body.appendChild(container)
