import { Card, CardHeader, CardContent, Divider } from '@mui/material'

interface Props {
  title?: string
  children: JSX.Element | JSX.Element[]
}

const ChildCard = ({ title, children }: Props): JSX.Element => (
  <Card
    sx={{ padding: 0, borderColor: (theme: any) => theme.palette.divider }}
    variant="outlined"
  >
    {title ? (
      <>
        <CardHeader title={title} />
        <Divider />{' '}
      </>
    ) : (
      ''
    )}

    <CardContent>{children}</CardContent>
  </Card>
)

export default ChildCard
