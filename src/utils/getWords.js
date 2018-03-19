import jsonp from '../utils/jsonp';

const options = {
  param: 'callback'
}

export function getWords (bhData) {
  const url = '//localhost:7999/'
  const data = { ...bhData }
  return jsonp(url, data, options)
}
