import NextLink from 'next/link'
import Link from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { type AppState, useSelector } from '@/store/Store'

interface IBasicBreadcrumbsProps {
  titleTo: string
  linkTo: string
  subLink?: Partial<{
    title: string
    link: string
  }>
}

const BasicBreadcrumbs = ({
  titleTo = '',
  linkTo = '/',
  subLink = undefined
}: IBasicBreadcrumbsProps): JSX.Element => {
  const dashboard = useSelector((state: AppState) => state.dashboard)
  const currentRole = (dashboard?.users || dashboard?.dinas)?.role_id ?? 1

  const currentPath: Record<number, string> = {
    1: '/dashboard',
    2: '/dinas',
    3: '/dashboard'
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={NextLink}
          fontSize={16}
          fontWeight={500}
          sx={{ color: '#6b7280' }}
          underline="hover"
          color="inherit"
          href={currentPath[currentRole] || '/dashboard'}
        >
          Dashboard
        </Link>
        <Link
          fontSize={16}
          fontWeight={!subLink ? 700 : 500}
          sx={{ color: subLink ? '#6b7280' : 'inherit' }}
          component={NextLink}
          underline="hover"
          color="inherit"
          href={linkTo}
        >
          {titleTo}
        </Link>
        {subLink && (
          <Link
            fontSize={16}
            fontWeight={700}
            component={NextLink}
            underline="hover"
            color="inherit"
            href={subLink?.link || '/'}
          >
            {subLink?.title}
          </Link>
        )}
      </Breadcrumbs>
    </>
  )
}

export default BasicBreadcrumbs
