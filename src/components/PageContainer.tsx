interface Props {
  children: any | JSX.Element | JSX.Element[]
}

const PageContainer = ({ children }: Props): JSX.Element => (
  <div>{children}</div>
)

export default PageContainer
