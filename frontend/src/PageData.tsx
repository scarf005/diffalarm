import { Title, Code, Stack } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { domTextAtom, pageAtom } from './atom'

export const PageData = () => {
  const data = useAtomValue(domTextAtom)
  console.debug(data)

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Stack>
        <Title size="h2">HTML 결과</Title>
        <Prism withLineNumbers language="markup">
          {data ?? '로딩중...'}
        </Prism>
      </Stack>
    </Suspense>
  )
}
