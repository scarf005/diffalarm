import axios from 'axios'

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
}
