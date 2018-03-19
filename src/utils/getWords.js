import jsonp from '../utils/jsonp';
import { url } from '../config';
const options = {
  param: 'callback'
}

export function getWords (bhData) {
  const data = { ...bhData }
  return jsonp(url, data, options)
}
