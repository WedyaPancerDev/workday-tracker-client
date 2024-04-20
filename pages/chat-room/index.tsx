import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ChatRoom = (): JSX.Element => {
  return <div>ChatRoom</div>
}

export default Authenticated(ChatRoom)
