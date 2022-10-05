import { TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

export const Form = () => {
  const form = useForm({
    initialValues: { url: '', selector: '', regex: '\\d+', criteria: 0 },

    validate: {
      url: value => {
        if (!value) return 'URL이 비어있습니다'
        if (!value.startsWith('http')) return 'URL must start with http'
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        placeholder="www.example.com"
        label="찾을 웹 페이지"
        withAsterisk
      />
      <TextInput placeholder="" label="CSS 선택자"></TextInput>
      <Button type="submit">찾기</Button>
    </form>
  )
}
