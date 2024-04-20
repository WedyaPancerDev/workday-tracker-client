import { styled } from '@mui/material'

interface Props {
  children: React.ReactNode
}

const Main = styled('main')({
  position: 'relative'
})

const PageContainer = ({ children }: Props): JSX.Element => (
  <Main>{children}</Main>
)

export default PageContainer
