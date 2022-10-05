import axios from 'axios'
export const API_URL = 'http://127.0.0.1:8000'

export const getElement = async (url: string, selector: string) => {
  return await axios.get(`${API_URL}/query/element`, {
    data: { url, selector },
  })
}

export const getURL = async (url: string) => {
  // return await fetch(`${API_URL}/query`, {
  //   method: 'GET',
  //   mode: 'cors',
  //   body: JSON.stringify({ url }),
  // })
  // const o = {
  //   method: 'GET',
  //   url: `${API_URL}/`,
  //   // data: { url },
  // }
  // return await axios.get(`${API_URL}/`)
  // console.log(o)
  // const { data } = await axios(o)
  // return data
  return await axios.post(`${API_URL}/query`, { data: { url: url } })
}
