const d3 = require('d3')
import { data_url } from '../config'
import { getMap } from './load-map'

d3.request(data_url)
  .get(data => {
    data = JSON.parse(data.responseText)
    console.log(data)
  })

let container = document.createElement('div')
container.id = container.className = 'container'

const map = getMap()

document.body.appendChild(container)
container.appendChild(map)

map.style.cssText += 'width:100%; height:100%;'
