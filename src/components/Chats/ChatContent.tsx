import { Fragment, useEffect } from 'react'
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Badge,
  Skeleton,
  CircularProgress
} from '@mui/material'
import { useRouter } from 'next/router'

import { type AppState, useSelector, dispatch } from '@/store/Store'
import useMessage from '@/hooks/useMessage'
import styled from '@emotion/styled'
import { getMessages } from '@/store/apps/chat/ChatSlice'

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

const ChatContent = (): JSX.Element => {
  const router = useRouter()
  const { cid } = router.query

  const { getMessageConversation } = useMessage()

  const { messages } = useSelector((state: AppState) => state.chat)
  const { profile } = useSelector((state: AppState) => state.dashboard)

  useEffect(() => {
    if (cid) {
      getMessageConversation(cid as string)
    }

    return () => {
      dispatch(getMessages([]))
    }
  }, [cid])

  const whoAreYouChat = messages?.find(
    (item) => item?.user?.uuid !== profile?.user_id
  )?.user

  return (
    <Box>
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
                whoAreYouChat?.fullname ? (
                  <Typography variant="h5">
                    {whoAreYouChat?.fullname}
                  </Typography>
                ) : (
                  <Skeleton variant="rounded" width={100} height={25} />
                )
              }
              secondary={
                whoAreYouChat?.role ? (
                  <Typography variant="body2" marginTop="4px">
                    {whoAreYouChat?.role}
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

      <Box
        sx={{
          width: '100%',
          height: '650px',
          overflow: 'auto',
          maxHeight: '800px'
        }}
      >
        <Box p={3} height="100%">
          {messages?.length > 0 ? (
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
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ChatContent
