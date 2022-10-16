import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai/query'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/query'

interface QueryResult {
  status: 'ok' | 'error'
  message: string
}

export const urlAtom = atom('https://www.example.com')
export const selectorAtom = atom('div')

export const pageAtom = atomWithQuery(get => {
  const url = get(urlAtom)
  return {
    queryKey: ['url', url],
    queryFn: async ({ queryKey: [, url] }) => {
      const { data } = await axios.post<QueryResult>(API_URL, { url })
      return data
    },
  }
})

export const domAtom = atom(get => {
  const parser = new DOMParser()
  const { message } = get(pageAtom)
  return parser.parseFromString(message, 'text/html').querySelector('body')
})

// DOM string representation
export const domTextAtom = atom(get => get(domAtom)?.outerHTML)

export const selectedTextAtom = atom(get => {
  const dom = get(domAtom)
  const selector = get(selectorAtom)
  try {
    return dom?.querySelector(selector)?.textContent
  } catch {
    return ''
  }
})
