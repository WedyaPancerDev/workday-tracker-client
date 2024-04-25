import { Box, Button, FormHelperText, IconButton } from '@mui/material'
import { IconTrash } from '@tabler/icons-react'

interface Props {
  label: string
  linkUrl: string
  onDelete: (() => void) | null
}

const SelectedFilePreview = ({
  label,
  linkUrl,
  onDelete
}: Props): JSX.Element => {
  return (
    <Box paddingBottom="18px">
      <FormHelperText sx={{ mt: -2 }}>{label}</FormHelperText>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #d1d1d1',
          borderRadius: '6px',
          padding: '4px'
        }}
      >
        <Button
          color="inherit"
          variant="text"
          sx={{ fontWeight: 600, ':hover': { backgroundColor: '#f3f4f6' } }}
          onClick={() => {
            window.open(linkUrl, '_blank')
          }}
        >
          Lihat File
        </Button>

        {onDelete ? (
          <IconButton aria-label="delete" onClick={onDelete}>
            <IconTrash />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  )
}

export default SelectedFilePreview
