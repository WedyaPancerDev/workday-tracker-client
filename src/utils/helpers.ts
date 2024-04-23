import CryptoJS from 'crypto-js'

const key = 'd17e5fb4-352f-4263-a4c7-e271efd3b454'

export const encryptText = (text: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(text, key).toString()
  return ciphertext.split('/').join('---').split('+').join('@@')
}

export const decryptText = (text: string): string => {
  try {
    const encrypted = text
      .split('---')
      .join('/')
      .split('@@')
      .join('+')
      .split(' ')
      .join('+')
    const bytes = CryptoJS.AES.decrypt(encrypted, key)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  } catch (error) {
    return ''
  }
}

export const formatDateTime = (dateTimeStr: string): string => {
  const dateTime = new Date(dateTimeStr)
  const formattedDateTime = dateTime?.toLocaleString()

  return `${formattedDateTime}`
}

export const generateGoogleMapsLink = (lat: string, lng: string): string => {
  return `https://www.google.com/maps?q=${lat},${lng}`
}
