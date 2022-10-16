import { TextInput, Button, Title, Divider, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAtom, useSetAtom } from 'jotai'
import { urlAtom } from './atom'

// type extractType = 'number'
export type compareType = '>' | '>=' | '==' | '<=' | '<'
const withHttp = (url: string) =>
  url.indexOf('://') === -1 ? `http://${url}` : url

export const URLForm = () => {
  const setValue = useSetAtom(urlAtom)
  const form = useForm<{ url: string }>({
    initialValues: {
      url: '',
    },
    validate: {
      url: v => {
        if (!v) return 'URL이 비어있습니다'
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit(value => setValue(withHttp(value.url)))}>
      <Stack>
        <Title size="h2">조건</Title>
        <TextInput
          withAsterisk
          label="찾을 웹 페이지"
          placeholder="www.example.com"
          {...form.getInputProps('url')}
        />
        <Button type="submit">선택 조건으로 찾기</Button>
      </Stack>
    </form>
  )
}
