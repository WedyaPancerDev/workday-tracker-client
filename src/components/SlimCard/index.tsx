import { getCurrentDay } from '@/utils/helpers'
import { Box, Skeleton, Typography } from '@mui/material'
import { IconReport, IconReportAnalytics, IconUser } from '@tabler/icons-react'

interface SlimCardProps {
  title: string
  value: number
  isDay?: boolean
  isLoading: boolean
  type: 'employee' | 'attendance' | 'timeoffs'
  style?: React.CSSProperties
}

const SlimCard = ({
  title = '',
  value = 0,
  type = 'employee',
  isDay = false,
  isLoading = true,
  style
}: SlimCardProps): JSX.Element => {
  const currentDay = getCurrentDay()

  const icon: Record<string, JSX.Element> = {
    employee: <IconUser size={24} />,
    attendance: <IconReport size={24} />,
    timeoffs: <IconReportAnalytics size={24} />
  }

  return (
    <Box
      sx={{
        cursor: 'pointer',
        backgroundColor: '#FFF',
        border: '2px solid #f3f4f6',
        padding: '12px',
        transition: 'all 0.3s',
        '&:hover': {
          borderColor: '#e5e7eb'
        },
        ...style
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          color="inherit"
          sx={{ color: '#6b7280' }}
          fontSize="16px"
          fontWeight={500}
        >
          {title}
        </Typography>

        {icon[type]}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isLoading ? (
          <Skeleton
            width={44}
            height={44}
            variant="rounded"
            sx={{ marginTop: '4px' }}
          />
        ) : (
          <Typography
            marginTop="4px"
            variant="h1"
            fontSize="38px"
            fontWeight={800}
            letterSpacing={-1}
          >
            {value}
          </Typography>
        )}

        {isDay && (
          <Typography
            marginTop="4px"
            variant="body1"
            fontSize="16px"
            fontWeight={600}
            alignSelf="flex-end"
          >
            {currentDay}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default SlimCard
