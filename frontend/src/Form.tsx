import {
  TextInput,
  Button,
  Select,
  Title,
  Divider,
  Group,
  SimpleGrid,
  Code,
} from '@mantine/core'
import { createFormContext, useForm } from '@mantine/form'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Suspense, useEffect } from 'react'
import { Text } from '@mantine/core'
import { formAtom, FormValues, pageAtom, urlAtom } from './atom'

// type extractType = 'number'
export type compareType = '>' | '>=' | '==' | '<=' | '<'

export const Form = () => {
  const [value, setValue] = useAtom(formAtom)
  const form = useForm<FormValues>({
    initialValues: {
      url: '',
      selector: ''
    },
    validate: {
      url: v => {
        if (!v) return 'URL이 비어있습니다'
      },
    },
  })

  return (
    <form
      onSubmit={form.onSubmit(value => {
        setValue(value)
      })}
    >
      <Title size="h2">조건</Title>
      <TextInput
        withAsterisk
        label="찾을 웹 페이지"
        placeholder="www.example.com"
        {...form.getInputProps('url')}
      />
      <Divider my="md" />
      <Button type="submit">선택 조건으로 찾기</Button>
      <PageData />
      {/* <Code block>{JSON.stringify(value, null, 2)}</Code> */}
    </form>
  )
}

export const PageData = () => {
  const data = useAtomValue(pageAtom)

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      {data && <Code block>{data.message}</Code>}
    </Suspense>
  )
}
