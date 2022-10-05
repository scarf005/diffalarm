import { Text, Title, Group, Header } from '@mantine/core'

export const UpperHeader = () => (
  <Header height={60} p="xs">
    <Group>
      <Title>SiteDiff</Title>
      <Text>사이트의 특정 값을 추적합니다</Text>
    </Group>
  </Header>
)
