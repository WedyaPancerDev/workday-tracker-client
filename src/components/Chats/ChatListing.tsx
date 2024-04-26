import { last } from 'lodash'
import { Fragment, useEffect } from 'react'
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  Box,
  Alert,
  Badge,
  ListItemButton,
  Typography
} from '@mui/material'
import Scrollbar from '@/components/Scrollbar'
import { type ChatsType } from '@/types/chat'
import { formatDistanceToNowStrict } from 'date-fns'
import { IconSearch } from '@tabler/icons-react'
import { useSelector, useDispatch, type AppState } from '@/store/Store'
import { SelectChat, fetchChats, SearchChat } from '@/store/apps/chat/ChatSlice'

import OutlineInput from '@/components/OutlineInput'

const ChatListing = (): JSX.Element => {
  const dispatch = useDispatch()
  const dashboard = useSelector((state: AppState) => state.dashboard)
  const activeChat = useSelector((state: AppState) => state.chat.chatContent)

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])

  const filterChats = (chats: ChatsType[], cSearch: string): ChatsType[] => {
    if (chats) {
      return chats.filter((t) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
      )
    }

    return chats
  }

  const chats = useSelector((state) =>
    filterChats(state.chat.chats, state.chat.chatSearch)
  )

  const getDetails = (conversation: ChatsType): string => {
    let displayText = ''

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? 'You: ' : ''
      const message =
        lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg
      displayText = `${sender}${message}`
    }

    return displayText
  }

  const lastActivity = (chat: ChatsType): string => {
    return last(chat.messages)?.createdAt
  }

  return (
    <Fragment>
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          overlap="circular"
          color="success"
        >
          <Avatar
            alt="Remy Sharp"
            src="/images/profile/user-1.jpg"
            sx={{ width: 54, height: 54 }}
          />
        </Badge>
        <Box>
          <Typography
            variant="h5"
            color="textPrimary"
            fontWeight={600}
            sx={{
              width: '120px',
              marginTop: '2px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {dashboard?.profile?.fullname || '...'}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textTransform="capitalize"
            sx={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}
          >
            {dashboard?.profile?.position || '...'}
          </Typography>
        </Box>
      </Box>

      <Box px={3} py={1}>
        <OutlineInput
          fullWidth
          id="search-input"
          type="text"
          sx={{ fontWeight: 600 }}
          placeholder="Search Contacts"
          endAdornment={<IconSearch size={18} />}
          onChange={(e) => dispatch(SearchChat(e.target.value))}
        />
      </Box>

      <List sx={{ px: 0 }}>
        <Scrollbar
          sx={{
            height: { lg: 'calc(100vh - 100px)', md: '100vh' },
            maxHeight: '600px'
          }}
        >
          {chats?.length ? (
            chats.map((chat: any) => {
              const lastActivityChat = lastActivity(chat)

              return (
                <ListItemButton
                  key={chat.id}
                  onClick={() => dispatch(SelectChat(chat.id))}
                  sx={{
                    mb: 0.5,
                    py: 2,
                    px: 3,
                    alignItems: 'start'
                  }}
                  selected={activeChat === chat.id}
                >
                  <ListItemAvatar>
                    <Badge
                      color={
                        chat.status === 'online'
                          ? 'success'
                          : chat.status === 'busy'
                            ? 'error'
                            : chat.status === 'away'
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
                      <Avatar
                        alt="Remy Sharp"
                        src={chat.thumb}
                        sx={{ width: 42, height: 42 }}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                        {chat.name}
                      </Typography>
                    }
                    secondary={getDetails(chat)}
                    secondaryTypographyProps={{
                      noWrap: true
                    }}
                    sx={{ my: 0 }}
                  />
                  <Box sx={{ flexShrink: '0' }} mt={0.5}>
                    <Typography variant="body2">
                      {formatDistanceToNowStrict(new Date(lastActivityChat), {
                        addSuffix: false
                      })}
                    </Typography>
                  </Box>
                </ListItemButton>
              )
            })
          ) : (
            <Box m={2}>
              <Alert
                severity="error"
                variant="filled"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  display: 'flex',
                  fontSize: '12px',
                  alignItems: 'center'
                }}
              >
                No Contacts Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </Fragment>
  )
}

export default ChatListing
