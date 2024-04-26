import React from 'react'
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Box,
  Stack,
  Badge,
  useMediaQuery,
  type Theme
} from '@mui/material'
import {
  IconDotsVertical,
  IconMenu2,
  IconPhone,
  IconVideo
} from '@tabler/icons-react'
import { type AppState, useSelector } from '@/store/Store'
import { formatDistanceToNowStrict } from 'date-fns'

import { type ChatsType } from '@/types/chat'
import ChatInsideSidebar from './ChatInsideSidebar'

interface ChatContentProps {
  toggleChatSidebar: () => void
}

const ChatContent = ({ toggleChatSidebar }: ChatContentProps): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(true)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const chatDetails: ChatsType = useSelector(
    (state: AppState) => state.chat.chats[state.chat.chatContent - 1]
  )

  return (
    <Box>
      {chatDetails ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px'
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={chatDetails.id} dense disableGutters>
                <ListItemAvatar>
                  <Badge
                    color={
                      chatDetails.status === 'online'
                        ? 'success'
                        : chatDetails.status === 'busy'
                          ? 'error'
                          : chatDetails.status === 'away'
                            ? 'warning'
                            : 'secondary'
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    overlap="circular"
                  >
                    <Avatar alt={chatDetails.name} src={chatDetails.thumb} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h5">{chatDetails.name}</Typography>
                  }
                  secondary={chatDetails.status}
                />
              </ListItem>
              <Stack direction={'row'}>
                <IconButton aria-label="phone">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="video">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton
                  aria-label="sidebar"
                  onClick={() => {
                    setOpen(!open)
                  }}
                >
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>

          <Box display="flex">
            <Box width="100%">
              <Box
                sx={{
                  height: '650px',
                  overflow: 'auto',
                  maxHeight: '800px'
                }}
              >
                <Box p={3}>
                  {chatDetails.messages.map((chat) => {
                    return (
                      <Box key={chat.id + chat.createdAt}>
                        {chatDetails.id === chat.senderId ? (
                          <Box display="flex">
                            <ListItemAvatar>
                              <Avatar
                                alt={chatDetails.name}
                                src={chatDetails.thumb}
                                sx={{ width: 40, height: 40 }}
                              />
                            </ListItemAvatar>
                            <Box>
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  {chatDetails.name},{' '}
                                  {formatDistanceToNowStrict(
                                    new Date(chat.createdAt),
                                    {
                                      addSuffix: false
                                    }
                                  )}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'grey.100',
                                    mr: 'auto',
                                    maxWidth: '320px'
                                  }}
                                >
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    overflow: 'hidden',
                                    lineHeight: '0px'
                                  }}
                                >
                                  <img
                                    src={chat.msg}
                                    alt="attach"
                                    width="150"
                                  />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                          >
                            <Box
                              alignItems="flex-end"
                              display="flex"
                              flexDirection={'column'}
                            >
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  {formatDistanceToNowStrict(
                                    new Date(chat.createdAt),
                                    {
                                      addSuffix: false
                                    }
                                  )}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '320px'
                                  }}
                                >
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box
                                  mb={1}
                                  sx={{ overflow: 'hidden', lineHeight: '0px' }}
                                >
                                  <img
                                    src={chat.msg}
                                    alt="attach"
                                    width="250"
                                  />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {open ? (
              <Box flexShrink={0}>
                <ChatInsideSidebar
                  isInSidebar={lgUp ? open : !open}
                  chat={chatDetails}
                />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      ) : (
        <Box
          p={2}
          py={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            overflowY: 'auto',
            height: 'calc(100vh - 280px)'
          }}
        >
          <Typography variant="h5" fontSize="18px" fontWeight={600}>
            ...
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ChatContent
