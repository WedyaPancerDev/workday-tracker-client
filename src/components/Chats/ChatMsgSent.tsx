import {
  sendMessageByConversationId,
  type SendMessagePayload
} from '@/services/chat'

import { IconSend } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, InputBase, Box } from '@mui/material'
import { type AppState, useSelector } from '@/store/Store'

const ChatMsgSent = (): JSX.Element => {
  const { profile } = useSelector((state: AppState) => state.dashboard)
  const { conversationId, conversationList } = useSelector(
    (state: AppState) => state.chat
  )

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      message: ''
    }
  })

  const form = watch()

  const getPayload = (): SendMessagePayload | null => {
    if (!profile?.user_id) return null

    const whoAreYouChat =
      conversationList?.length > 0
        ? conversationList?.find(
            (item) => item?.conversationId === conversationId
          )?.user
        : null

    const payload: SendMessagePayload = {
      conversationId,
      senderId: profile.user_id,
      message: form.message,
      receiverId: whoAreYouChat?.receiverId || ''
    }

    return payload
  }

  const onChatMsgSubmit = async (): Promise<void> => {
    const payload = getPayload()

    try {
      const response = await sendMessageByConversationId(
        payload as SendMessagePayload
      )

      if (response?.code === 200) {
        console.log('Send it!')
        setValue('message', '')
      }
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
                autoFocus
                type="text"
                autoComplete="off"
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
