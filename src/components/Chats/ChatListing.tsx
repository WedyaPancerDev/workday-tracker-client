/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ConversationUserByIdResponse } from '@/services/chat'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
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
import { useSelector, type AppState } from '@/store/Store'
import useMessage from '@/hooks/useMessage'

interface IChatListing {
  isLoading?: boolean
}

const ChatListing = ({ isLoading }: IChatListing): JSX.Element => {
  const router = useRouter()
  const { cid } = router.query

  const { getMessageConversation } = useMessage()

  const dashboard = useSelector((state: AppState) => state.dashboard)
  const { conversationList, conversationId } = useSelector(
    (state: AppState) => state.chat
  )

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
        <Typography variant="h6" color="textPrimary" fontWeight={600}>
          List Kontak
        </Typography>
      </Box>

      <List sx={{ px: 0 }}>
        <Scrollbar
          sx={{
            height: { lg: 'calc(100vh - 100px)', md: '100vh' },
            maxHeight: '600px'
          }}
        >
          <Box m={2}>
            {conversationList?.length > 0 ? (
              (conversationList as ConversationUserByIdResponse[])?.map(
                (item, indexItem) => {
                  return (
                    <Fragment key={item?.conversationId}>
                      <ListItemButton
                        onClick={() => {
                          getMessageConversation(item?.conversationId)
                        }}
                        sx={{
                          mb: 0.5,
                          py: 2,
                          px: 3,
                          alignItems: 'start',
                          borderRadius: '10px',
                          border: '1px solid #e5e7eb',
                          backgroundColor:
                            (cid || conversationId) === item?.conversationId
                              ? '#f3f4f6'
                              : '#FFF'
                        }}
                      >
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
                            <Avatar
                              alt={item?.user?.fullname}
                              src=""
                              sx={{ width: 42, height: 42 }}
                            />
                          </Badge>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              mb={0.5}
                            >
                              {item?.user?.fullname || ''}
                            </Typography>
                          }
                          secondary={item?.user?.role}
                          secondaryTypographyProps={{
                            noWrap: true
                          }}
                          sx={{ my: 0 }}
                        />
                      </ListItemButton>
                    </Fragment>
                  )
                }
              )
            ) : (
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
            )}
          </Box>
        </Scrollbar>
      </List>
    </Fragment>
  )
}

export default ChatListing
