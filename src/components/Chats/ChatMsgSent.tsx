/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconSend } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, InputBase, Box } from '@mui/material'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/configs/firebase'
import { nanoid } from 'nanoid'
import { type AppState, useSelector } from '@/store/Store'

const ChatMsgSent = (): JSX.Element => {
  const { conversationId } = useSelector((state: AppState) => state.chat)
  const { currentUser } = useSelector((state: AppState) => state.authFirebase)

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      message: ''
    }
  })

  const form = watch()

  const onSubmit = async (): Promise<void> => {
    if (form.message === '') return
    const messageId = nanoid()
    const currentUnixtime = new Date().getTime()

    try {
      await setDoc(doc(db, 'messages', messageId), {
        conversationId,
        date_created: currentUnixtime,
        senderId: currentUser?.user_id,
        message: form.message
      })

      setValue('message', '')
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
          handleSubmit(onSubmit)(e)
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
