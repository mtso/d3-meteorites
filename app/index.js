const d3 = require('d3')
import { data_url } from '../config'

d3.request(data_url)
  .get(data => {
    data = JSON.parse(data.responseText)
    console.log(data)
  })