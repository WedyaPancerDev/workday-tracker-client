import { toast } from 'react-hot-toast'

interface IUseToast {
  showToast: (props: { message: string; type?: 'success' | 'error' }) => void
}

interface IToastProps {
  message: string
  type?: 'success' | 'error'
}

const useToast = (): IUseToast => {
  const showToast = ({ message, type = 'success' }: IToastProps): void => {
    toast[type](message)
  }

  return {
    showToast
  }
}

export default useToast
