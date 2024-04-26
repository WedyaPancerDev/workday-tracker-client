import React from 'react'
import { useSelector, useDispatch, type AppState } from '@/store/Store'
import { IconButton, InputBase, Box, Popover } from '@mui/material'
import EmojiPicker, {
  EmojiStyle,
  type EmojiClickData,
  Emoji
} from 'emoji-picker-react'
import { IconMoodSmile, IconSend } from '@tabler/icons-react'
import { sendMsg } from '@/store/apps/chat/ChatSlice'

const ChatMsgSent = (): JSX.Element => {
  const [msg, setMsg] = React.useState<string>('')

  const dispatch = useDispatch()
  const id = useSelector((state: AppState) => state.chat.chatContent)

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [chosenEmoji, setChosenEmoji] = React.useState<string>('')

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setChosenEmoji(emojiData.unified)
    setMsg(emojiData.emoji)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleChatMsgChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMsg(e.target.value)
  }

  const newMsg = { id, msg }

  const onChatMsgSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    setMsg('')
    dispatch(sendMsg(newMsg))
  }

  return (
    <div style={{ padding: '14px', borderTop: '1px solid #e5e7eb' }}>
      <Box
        component="form"
        onSubmit={onChatMsgSubmit}
        sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <IconButton
          id="long-button"
          aria-controls="long-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <IconMoodSmile />
        </IconButton>

        <Popover
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
          <Box p={2}>
            Selected:{' '}
            {chosenEmoji ? (
              <Emoji
                unified={chosenEmoji}
                emojiStyle={EmojiStyle.APPLE}
                size={22}
              />
            ) : (
              ''
            )}
          </Box>
        </Popover>
        <InputBase
          id="msg-sent"
          fullWidth
          autoFocus
          value={msg}
          size="small"
          type="text"
          autoComplete="off"
          sx={{ fontWeight: 600 }}
          placeholder="Type a Message"
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(sendMsg(newMsg))
            setMsg('')
          }}
          disabled={!msg}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </Box>
    </div>
  )
}

export default ChatMsgSent
