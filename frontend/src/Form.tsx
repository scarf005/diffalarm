import { TextInput, Button, Title, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAtom } from 'jotai'
import { formAtom, FormValues } from './atom'

// type extractType = 'number'
export type compareType = '>' | '>=' | '==' | '<=' | '<'

export const Form = () => {
  const [value, setValue] = useAtom(formAtom)
  const form = useForm<FormValues>({
    initialValues: {
      url: '',
      selector: '',
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
      <TextInput
        withAsterisk
        label="CSS 선택자"
        placeholder="div"
        {...form.getInputProps('selector')}
      />
      <Divider my="md" />
      <Button type="submit">선택 조건으로 찾기</Button>
    </form>
  )
}
