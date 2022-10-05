import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Text } from '@mantine/core'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getURL } from './hook'
import axios from 'axios'
const queryClient = new QueryClient()

axios.defaults.withCredentials = true

const Main = () => {
  const { data } = useQuery(
    ['data'],
    async () =>
      // await axios.get('http://127.0.0.7:8000/', {
      //   headers: { 'Access-Control-Allow-Origin': '*' },
      // })
      await axios.post('http://127.0.0.7:8000', {
        data: { url: 'https://www.example.com' },
        Headers: {},
      })
  )

  return (
    <div className="App">
      <h1>SiteDiff</h1>
      <div className="card">
        <button onClick={() => {}}>Send a request to the backend!</button>
      </div>
      <Text>{`${data}`}</Text>
    </div>
  )
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Main />
    </QueryClientProvider>
  )
}
