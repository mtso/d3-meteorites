const d3 = require('d3')
import { data_url } from '../config'
import { getMap } from './load-map'

const map = getMap()

let container = document.createElement('div')
container.id = container.className = 'container'
document.body.appendChild(container)

container.appendChild(map)

let mapWidth = d3.select(map).attr('width')
let mapHeight = d3.select(map).attr('height')

let sg = d3
  .select(container)
  .append('svg')
  .attr('viewBox', `0 0 ${mapWidth} ${mapHeight}`)
  .attr('class', 'overlay')

sg.append('text')
  .text('Meteorite Landings')
  .attr('text-anchor', 'middle')
  .attr('x', mapWidth / 2)
  .attr('y', 60)

const handleData = data => {
  data = JSON.parse(data.responseText)
  data = data.features
  data = data.filter(d => d.geometry && d.geometry.coordinates && d.geometry.coordinates.length === 2)

  let minX = d3.min(data, d => d.geometry.coordinates[0])
  let maxX = d3.max(data, d => d.geometry.coordinates[0])
  let minY = d3.min(data, d => d.geometry.coordinates[1])
  let maxY = d3.max(data, d => d.geometry.coordinates[1])

  const xScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([15, mapWidth - 25])

  const yScale = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([mapHeight - 155, 100])

  sg.selectAll('circle')
    .data(data).enter()
    .append('circle')
    .attr('cx', d => xScale(d.geometry.coordinates[0]))
    .attr('cy', d => yScale(d.geometry.coordinates[1]))
    .attr('r', d => Math.pow(d.properties.mass, 1/2.3)/80)
    .attr('fill', 'rgba(0,0,0,0.5)')
}

d3.request(data_url)
  .get(handleData)

