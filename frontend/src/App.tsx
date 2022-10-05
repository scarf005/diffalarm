import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getURL } from './hook'
import { AppShell, SimpleGrid, Text } from '@mantine/core'

import axios from 'axios'
import { Form } from './Form'
import { UpperHeader } from './UpperHeader'
const queryClient = new QueryClient()
import { wemake } from './test/wemake'

axios.defaults.withCredentials = true

// wemake is a html string; convert it to dom node
const html2dom = (html: string) => {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}
const wemakeDom = html2dom(wemake)

const Main = () => {
  return (
    <AppShell header={<UpperHeader />}>
      <SimpleGrid cols={2}>
        <Form />
        <Text>{`${wemakeDom.querySelector('.total_purchase > strong')?.textContent}`}</Text>
      </SimpleGrid>
    </AppShell>
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
