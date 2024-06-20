import type { IMessageResponse } from '@/hooks/useMessage'

import styled from '@emotion/styled'
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
import { type AppState, useSelector } from '@/store/Store'
import {
  type DocumentData,
  type Query,
  type QuerySnapshot,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import { db } from '@/configs/firebase'

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
  const { conversationId, whoAreYouChat, isOpenChat } = useSelector(
    (state: AppState) => state.chat
  )

  const [messages, setMessages] = useState<IMessageResponse[]>([])

  const snapshotMessageQuery = (
    conversationId: string
  ): Query<DocumentData> => {
    const messageCollection = collection(db, 'messages')
    const messageQuery = query(
      messageCollection,
      where('conversationId', '==', conversationId)
      // orderBy('date_created', 'desc')
    )

    return messageQuery
  }

  const handleSnapshot = (querySnapshot: QuerySnapshot<DocumentData>): void => {
    const messagesContainer: IMessageResponse[] = []
    querySnapshot.forEach((doc) => {
      messagesContainer.push(doc.data() as IMessageResponse)
    })

    if (!querySnapshot.metadata.hasPendingWrites) {
      setMessages(messagesContainer)
    }
  }

  useEffect(() => {
    let unSub = (): void => {}

    if (conversationId) {
      const query = snapshotMessageQuery(conversationId)
      unSub = onSnapshot(query, (querySnapshot) => {
        handleSnapshot(querySnapshot)
      })
    }

    return () => {
      unSub()
    }
  }, [conversationId])

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
                  whoAreYouChat?.fullname ? (
                    <Typography variant="h5">
                      {whoAreYouChat.fullname}
                    </Typography>
                  ) : (
                    <Skeleton variant="rounded" width={100} height={25} />
                  )
                }
                secondary={
                  whoAreYouChat?.role ? (
                    <Typography variant="body2" marginTop="4px">
                      {whoAreYouChat.role}
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
          maxHeight: '600px'
        }}
      >
        <Box p={3} height="100%">
          {isOpenChat ? (
            messages
              .sort((a, b) => a.date_created - b.date_created)
              ?.map((chat, chatIndex) => {
                const isActive = chat.senderId !== whoAreYouChat?.user_id

                return (
                  <Fragment key={chatIndex}>
                    <Box
                      className="message-box"
                      display="flex"
                      component="div"
                      justifyContent={isActive ? 'flex-end' : 'flex-start'}
                    >
                      <MessageBox position={isActive ? 'right' : 'left'}>
                        {chat?.message || ''}
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
