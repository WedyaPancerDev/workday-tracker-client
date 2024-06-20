import { Fragment, useCallback, useEffect, useState } from 'react'
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
import {
  type DocumentData,
  type Query,
  type QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'

import { db } from '@/configs/firebase'
import CustomTextField from '../OutlineInput'
import Scrollbar from '@/components/Scrollbar'

import { useDispatch, useSelector, type AppState } from '@/store/Store'

import { IconSearch } from '@tabler/icons-react'
import {
  setOpenChat,
  saveConversationId,
  setWhoAreYouChat
} from '@/store/apps/ChatSlice'
import useMessage, {
  type IConversationUserResponse,
  type IFindUserResponse
} from '@/hooks/useMessage'

const ChatListing = (): JSX.Element => {
  const [userFullname, setUserFullname] = useState<string>('')
  const [findUser, setFindUser] = useState<IFindUserResponse | null>(null)

  const [isError, setIsError] = useState<boolean>(false)

  const dispatch = useDispatch()
  const dashboard = useSelector((state: AppState) => state.dashboard)
  const { currentUser } = useSelector((state: AppState) => state.authFirebase)
  const { conversationId, isAlreadyExist } = useSelector(
    (state: AppState) => state.chat
  )

  const userId = currentUser?.user_id

  const [conversations, setConversations] = useState<
    IConversationUserResponse[]
  >([])

  const { createConversation } = useMessage()

  const handleSearch = async (): Promise<void> => {
    try {
      const querySearch = query(
        collection(db, 'users'),
        where('fullname', '>=', userFullname),
        where('fullname', '<=', `${userFullname}\uf8ff`)
      )

      const querySnapshot = await getDocs(querySearch)
      if (querySnapshot.empty) {
        setIsError(true)

        return
      }

      setIsError(false)
      querySnapshot.forEach((doc) => {
        setFindUser(doc.data() as IFindUserResponse | null)
      })
    } catch (error) {
      setIsError(true)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleOpen = useCallback((item: IConversationUserResponse): void => {
    dispatch(
      setWhoAreYouChat({
        role: item?.user?.role || '',
        fullname: item?.user?.fullname || '',
        user_id: item?.user?.receiverId || ''
      })
    )
    dispatch(saveConversationId(item?.conversationId))
    dispatch(setOpenChat(true))
  }, [])

  const snapshotQuery = (
    userIds: string
  ): Query<DocumentData, DocumentData> => {
    const queryRef = query(
      collection(db, 'conversations'),
      where('members', 'array-contains', userIds)
    )

    return queryRef
  }

  const handleSnapshot = async (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ): Promise<void> => {
    const conversationList = await Promise.all(
      querySnapshot.docs.map(async (conversationDoc) => {
        const conversationData = conversationDoc.data()
        const receiveId = conversationData.members.find(
          (member: string) => member !== userId
        )

        const userDoc = await getDoc(doc(db, 'users', receiveId))
        const userData = userDoc.data()

        return {
          user: {
            receiverId: userData?.user_id,
            role: userData?.position,
            fullname: userData?.fullname
          },
          conversationId: conversationDoc.id
        }
      })
    )

    setConversations(conversationList)
  }

  useEffect(() => {
    let unSub = (): void => {}

    if (userId && isAlreadyExist === 'exist') {
      const query = snapshotQuery(userId)
      unSub = onSnapshot(query, (querySnapshot) => {
        handleSnapshot(querySnapshot)
      })
    }
    return () => {
      unSub()
    }
  }, [userId, isAlreadyExist])

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

      <Box p={2}>
        <CustomTextField
          fullWidth
          value={userFullname}
          onKeyDown={handleKey}
          onChange={(e) => {
            setUserFullname(e.target.value)
          }}
          placeholder="Cari kontak pengguna"
          sx={{ fontWeight: 600 }}
          endAdornment={<IconSearch style={{ cursor: 'pointer' }} />}
        />

        {userFullname?.length > 3 && (
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Press <strong>Enter</strong> to search
          </Typography>
        )}
      </Box>

      <List sx={{ px: 0 }}>
        <Scrollbar
          sx={{
            height: { lg: 'calc(100vh - 100px)', md: '100vh' },
            maxHeight: '600px'
          }}
        >
          <Box component="div" className="user-search" m={2}>
            {isError && (
              <Alert
                severity="error"
                variant="filled"
                onClose={() => {
                  setIsError(false)
                  setUserFullname('')
                }}
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  display: 'flex',
                  fontSize: '12px',
                  marginTop: '14px',
                  alignItems: 'center'
                }}
              >
                Pengguna tidak ditemukan!
              </Alert>
            )}

            {findUser && (
              <ListItemButton
                sx={{
                  mb: 0.5,
                  py: 1.5,
                  px: 2,
                  alignItems: 'start',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb'
                }}
                onClick={() => {
                  const userId = currentUser?.user_id ?? ''
                  const findUserId = findUser?.user_id ?? ''

                  createConversation(userId, findUserId)

                  setFindUser(null)
                  setUserFullname('')
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
                    <Avatar alt="" src="" sx={{ width: 32, height: 32 }} />
                  </Badge>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600}>
                      {findUser?.fullname || ''}
                    </Typography>
                  }
                  secondary={findUser?.position || ''}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontWeight: 500
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            )}
          </Box>

          <Typography
            variant="h6"
            color="textPrimary"
            marginX={2}
            marginBottom={2}
            fontWeight={600}
          >
            List Kontak
          </Typography>
          <Box m={2}>
            {conversations?.length > 0 ? (
              conversations?.map((item, indexItem) => {
                return (
                  <Fragment key={item?.conversationId}>
                    <ListItemButton
                      onClick={() => {
                        handleOpen(item)
                      }}
                      sx={{
                        mb: 0.5,
                        py: 2,
                        px: 3,
                        marginTop: '10px',
                        alignItems: 'start',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb',
                        backgroundColor:
                          conversationId === item?.conversationId
                            ? '#e5e7eb'
                            : ''
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
                            alt={item?.user?.fullname || ''}
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
                        secondary={item?.user?.role || ''}
                        secondaryTypographyProps={{
                          noWrap: true
                        }}
                        sx={{ my: 0 }}
                      />
                    </ListItemButton>
                  </Fragment>
                )
              })
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
                Tidak ada percakapan!
              </Alert>
            )}
          </Box>
        </Scrollbar>
      </List>
    </Fragment>
  )
}

export default ChatListing
