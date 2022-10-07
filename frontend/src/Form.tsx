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
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

// type extractType = 'number'
export type compareType = '>' | '>=' | '==' | '<=' | '<'

interface FormValues {
  url: string
  // selector: string
  // extract: extractType
  // criteria: number
}

const formAtom = atom<FormValues>({
  url: '',
})

// const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()

export const Form = () => {
  const [value, setValue] = useAtom(formAtom)
  const form = useForm<FormValues>({
    validate: {
      url: v => {
        if (!v) return 'URL이 비어있습니다'
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit(setValue)}>
      <Title size="h2">조건</Title>
      <TextInput
        placeholder="www.example.com"
        label="찾을 웹 페이지"
        withAsterisk
        {...form.getInputProps('url')}
      />
      {/* <TextInput placeholder="" label="CSS 선택자" />
      <SimpleGrid cols={3}>
        <TextInput placeholder="100" label="비교값 예시" disabled />
        <Select
          label="비교 방식"
          defaultValue={'>='}
          data={[
            { value: '>', label: '>' },
            { value: '>=', label: '>=' },
            { value: '==', label: '=' },
            { value: '<=', label: '<=' },
            { value: '>', label: '<' },
          ]}
        />
        <TextInput placeholder="0" label="검사 조건" />
      </SimpleGrid> */}
      <Divider my="md" />
      <Button type="submit">선택 조건으로 찾기</Button>
      <Code block>{JSON.stringify(value, null, 2)}</Code>
    </form>
  )
}
