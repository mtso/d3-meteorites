const d3 = require('d3')

export const tooltip = function(d, container) {
  let content = Object.keys(d.properties).reduce((acc, key) => {
    if (!d.properties[key]) {
      return acc
    }
    return acc + '\n' + key + ': ' + String(d.properties[key])
  }, '')
  content = '<pre>' + content + '</pre>'

  let x = d3.mouse(container)[0]
  let y = d3.mouse(container)[1]

  let offset = '-50%'
  if (x < 100) {
    offset = '0'
  } else if (document.body.clientWidth && x > document.body.clientWidth - 100) {
    offset = '-100%'
  }

  return d3
    .select(container)
    .append('div')
    .attr('class', 'tooltip')
    .html(content)
    .style('display', 'visible')
    .style('left', x + 'px')
    .style('top', y + 'px')
    .style('transform', 'translate(' + offset + ', -120%)')
}

let tip;

tooltip.show = (container) => {
  return (d) => {
    tip = tooltip(d, container)
  }
}

tooltip.hide = _ => {
  tip.remove()
}
