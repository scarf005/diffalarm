import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppShell, SimpleGrid, Stack } from '@mantine/core'
import { URLForm } from './Form'
import { PageData } from './PageData'
import { UpperHeader } from './UpperHeader'
import { Provider } from 'jotai'
import { queryClientAtom } from 'jotai/query'
import { Selector, Search } from './Search'

const Shell = () => {
  return (
    <AppShell header={<UpperHeader />}>
      <SimpleGrid cols={2}>
        <Stack>
          <URLForm />
          <PageData />
        </Stack>
        <Stack>
          <Selector />
          <Search />
        </Stack>
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
