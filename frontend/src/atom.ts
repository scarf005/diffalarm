import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai/query'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/query'

interface QueryResult {
  status: 'ok' | 'error'
  message: string
}

export interface FormValues {
  url: string
  selector: string
}
export const formAtom = atom<FormValues>({
  url: 'https://www.example.com',
  selector: '',
})

export const pageAtom = atomWithQuery(get => {
  const url = get(formAtom).url
  return {
    queryKey: ['url', url],
    queryFn: async ({ queryKey: [, url] }) => {
      const { data } = await axios.post<QueryResult>(API_URL, { url })
      return data
    },
  }
})
