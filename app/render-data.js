const d3 = require('d3')
import { tooltip } from './tooltip'

export const renderData = (container, svg, mapWidth, mapHeight) => {
  return data => {
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

    svg
      .selectAll('circle')
      .data(data).enter()
      .append('circle')
      .attr('cx', d => xScale(d.geometry.coordinates[0]))
      .attr('cy', d => yScale(d.geometry.coordinates[1]))
      .attr('r', d => Math.pow(d.properties.mass, 0.43)/80 + 0.5)
      .attr('fill', 'rgba(0,0,0,0.5)')
      .on('mouseover', tooltip.show(container))
      .on('mouseout', tooltip.hide)
  }
}
