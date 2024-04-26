import { styled } from '@mui/material/styles'
import { TextField, type TextFieldProps } from '@mui/material'

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
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

export default CustomTextField
