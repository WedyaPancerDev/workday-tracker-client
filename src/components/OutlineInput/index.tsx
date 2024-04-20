import type { InputProps } from '@mui/material'

import { forwardRef } from 'react'
import { styled } from '@mui/material/styles'
import { OutlinedInput } from '@mui/material'

const CustomOutlinedInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <OutlinedInput ref={ref} {...props} />
  }
)

const StyledCustomOutlinedInput = styled(CustomOutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8'
  },

  '& .MuiTypography-root': {
    color: theme.palette.text.secondary
  },

  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1'
  }
}))

CustomOutlinedInput.displayName = 'CustomOutlinedInput'

export default StyledCustomOutlinedInput
