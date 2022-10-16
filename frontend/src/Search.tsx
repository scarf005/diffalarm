import { Button, Stack, Text, TextInput, Title } from '@mantine/core'
import { beep } from './beep'
import { useAtom, useAtomValue } from 'jotai'
import { selectedTextAtom, selectorAtom } from './atom'
import { Suspense } from 'react'

export const Search = () => {
  const selected = useAtomValue(selectedTextAtom)

  return (
    <Stack>
      <Suspense fallback={<div>로딩중...</div>}>
        <Title size="h4">선택한 HTML 요소</Title>
        <Text>{selected}</Text>
        <Title size="h4">추출한 값</Title>
        <Text>{selected}</Text>
        <Title size="h4">현재 조건과의 비교</Title>
        <Text>{`${selected} < 80000`}</Text>
        <Text>조건 미충족</Text>
      </Suspense>
      <Button onClick={() => beep()}>소리 울리기</Button>
    </Stack>
  )
}
export const Selector = () => {
  const [value, setValue] = useAtom(selectorAtom)
  return (
    <Stack>
      <Title size="h2">찾기</Title>
      <TextInput
        placeholder="div"
        label="CSS 선택자"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </Stack>
  )
}
