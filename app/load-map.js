export const getMap = _ => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'static/world-map.svg', false)
  xhr.send('')
  return xhr.responseXML.documentElement
}

export const getMapAsync = _ => {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'static/world-map.svg', data => {
      resolve(data)
    })
    xhr.send('')
  })
}