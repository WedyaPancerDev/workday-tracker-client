import React from 'react'
import ReactQuill, { type ReactQuillProps } from 'react-quill'
import { Box } from '@mui/material'

import 'react-quill/dist/quill.snow.css'

const RichTextEditor = ({ ...props }: ReactQuillProps): JSX.Element => {
  return (
    <Box>
      <ReactQuill {...props} />
    </Box>
  )
}

export default RichTextEditor
