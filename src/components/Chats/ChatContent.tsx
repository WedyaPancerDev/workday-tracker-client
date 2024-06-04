import { Fragment, useEffect, useState } from 'react'
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Badge,
  Skeleton
} from '@mui/material'
import { useRouter } from 'next/router'

import { type AppState, useSelector } from '@/store/Store'
import useMessage from '@/hooks/useMessage'
import styled from '@emotion/styled'

const MessageBox = styled('div')(
  ({ position }: { position: 'left' | 'right' }) => ({
    fontWeight: 600,
    color: '#4b5563',
    cursor: 'pointer',
    userSelect: 'none',
    marginBottom: '18px',
    padding: '12px 16px',
    backgroundColor: '#e5e7eb',
    borderRadius: `${position === 'left' ? '0px 12px' : '12px 0px'} 12px 12px`
  })
)

interface IHowAreYouChat {
  fullname: string
  role: string
  coversationId: string
}

const ChatContent = (): JSX.Element => {
  const router = useRouter()
  const { cid } = router.query

  const [statusChat, setStatusChat] = useState<boolean>(false)
  const [currentHowAreYouChat, setCurrentHowAreYouChat] =
    useState<IHowAreYouChat>({
      fullname: '',
      role: '',
      coversationId: ''
    })

  const { getMessageConversation } = useMessage()

  const { messages, isOpenChat, conversationList, conversationId } =
    useSelector((state: AppState) => state.chat)
  const { profile } = useSelector((state: AppState) => state.dashboard)

  useEffect(() => {
    if (conversationList?.length > 0 && (cid || conversationId)) {
      const currentData = conversationList.find(
        (item) => item?.conversationId === (cid || conversationId)
      )

      setStatusChat(true)
      setCurrentHowAreYouChat({
        fullname: currentData?.user?.fullname || '',
        role: currentData?.user?.role || '',
        coversationId: currentData?.conversationId || ''
      })
    }

    return () => {
      setStatusChat(false)
      setCurrentHowAreYouChat({
        fullname: '',
        role: '',
        coversationId: ''
      })
    }
  }, [conversationList?.length, cid, conversationId])

  useEffect(() => {
    if ((cid || conversationId) && statusChat) {
      getMessageConversation((cid || conversationId) as string)
    }
  }, [cid, conversationId, statusChat])

  return (
    <Box>
      {isOpenChat ? (
        <Box component="div" className="chat-header">
          <Box display="flex" alignItems="center" px={2} py={1}>
            <ListItem dense disableGutters>
              <ListItemAvatar>
                <Badge
                  color="success"
                  variant="dot"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  overlap="circular"
                >
                  <Avatar alt="" src="" />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  currentHowAreYouChat.fullname ? (
                    <Typography variant="h5">
                      {currentHowAreYouChat.fullname}
                    </Typography>
                  ) : (
                    <Skeleton variant="rounded" width={100} height={25} />
                  )
                }
                secondary={
                  currentHowAreYouChat.role ? (
                    <Typography variant="body2" marginTop="4px">
                      {currentHowAreYouChat.role}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="rounded"
                      width={50}
                      height={14}
                      sx={{ marginTop: '4px' }}
                    />
                  )
                }
              />
            </ListItem>
          </Box>

          <Divider />
        </Box>
      ) : null}

      <Box
        sx={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '800px'
        }}
      >
        <Box p={3} height="100%">
          {isOpenChat ? (
            messages.map((chat, chatIndex) => {
              const isActive = chat?.user?.uuid === profile?.user_id

              return (
                <Fragment key={chatIndex}>
                  <Box
                    className="message-box"
                    display="flex"
                    component="div"
                    justifyContent={isActive ? 'flex-end' : 'flex-start'}
                  >
                    <MessageBox position={isActive ? 'right' : 'left'}>
                      {chat.message}
                    </MessageBox>
                  </Box>
                </Fragment>
              )
            })
          ) : (
            <Box
              p={2}
              py={1}
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid #E5E7EB"
              maxWidth="fit-content"
              marginInline="auto"
            >
              <Typography variant="h6" color="textSecondary">
                Belum ada percakapan 🍃
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ChatContent
