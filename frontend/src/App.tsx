import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  AppShell,
  Button,
  Chip,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Form } from './Form'
import { UpperHeader } from './UpperHeader'
import { wemake } from './test/wemake'
import { beep } from './beep'
import { Provider } from 'jotai'
import { queryClientAtom } from 'jotai/query'

const html2dom = (html: string) => {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}
const wemakeDom = html2dom(wemake)

const Search = () => {
  return (
    <Stack>
      <Title size="h2">검색 결과</Title>
      <Title size="h4">선택한 HTML 요소</Title>
      <Text>{`${
        wemakeDom.querySelector('.total_purchase > strong')?.textContent
      }`}</Text>
      <Title size="h4">추출한 값</Title>
      <Text>75142</Text>
      <Title size="h4">현재 조건과의 비교</Title>
      <Text>{'75142 < 80000'}</Text>
      <Text>조건 미충족</Text>
      <Button onClick={() => beep()}>소리 울리기</Button>
    </Stack>
  )
}

const Shell = () => {
  return (
    <AppShell header={<UpperHeader />}>
      <SimpleGrid cols={2}>
        <Form />
        <Search />
      </SimpleGrid>
    </AppShell>
  )
}

const queryClient = new QueryClient()
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider initialValues={[[queryClientAtom, queryClient]]}>
        <Shell />
        <ReactQueryDevtools initialIsOpen={true} />
      </Provider>
    </QueryClientProvider>
  )
}
