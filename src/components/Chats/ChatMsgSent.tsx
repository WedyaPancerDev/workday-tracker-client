import { sendMessageByConversationId, type SendMessagePayload } from '@/services/chat'

import { IconSend } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, InputBase, Box } from '@mui/material'

interface IChatMsgSentProps {
  conversationId: string
}

const ChatMsgSent = ({ conversationId }: IChatMsgSentProps): JSX.Element => {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      message: ''
    }
  })

  const form = watch()

  const getPayload = (): SendMessagePayload => {
    const payload: SendMessagePayload = {
      conversationId,
      senderId: 'user_id',
      message: form.message
    }

    return payload
  }

  const onChatMsgSubmit = async (): Promise<void> => {
    try {
      const payload = getPayload()

      // const response = await sendMessageByConversationId(payload)
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <div style={{ padding: '14px', borderTop: '1px solid #e5e7eb' }}>
      <Box
        component="form"
        method="POST"
        onSubmit={(e) => {
          handleSubmit(onChatMsgSubmit)(e)
        }}
        sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <Controller
          name="message"
          control={control}
          render={({ field }) => {
            return (
              <InputBase
                {...field}
                fullWidth
                type="text"
                sx={{ fontWeight: 600 }}
                placeholder="Type a Message"
              />
            )
          }}
        />

        <IconButton type="submit" color="primary">
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </Box>
    </div>
  )
}

export default ChatMsgSent
