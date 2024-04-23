import { styled } from '@mui/material/styles'
import { TextField, type TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

const CustomInputTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <TextField ref={ref} {...props} />
  }
)

const StyledInputTextField = styled(CustomInputTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8'
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1'
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200]
  }
}))

CustomInputTextField.displayName = 'CustomInputTextField'

export default StyledInputTextField
