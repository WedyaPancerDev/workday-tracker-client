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

export const categoryTitle = [
  {
    label: 'Biasa',
    value: 'Biasa'
  },
  {
    label: 'Penting',
    value: 'Penting'
  },
  {
    label: 'Sangat Penting',
    value: 'Sangat Penting'
  }
]

export const levelTitle = [
  {
    label: 'Dasar',
    value: 'Dasar'
  },
  {
    label: 'Menengah',
    value: 'Menengah'
  },
  {
    label: 'Mahir',
    value: 'Mahir'
  }
]

export const isSpecialNeed = [
  {
    label: 'Ada',
    value: 'ada'
  },
  {
    label: 'Tidak Ada',
    value: 'tidak ada'
  }
]

export const dataSyaratKhusus = [
  {
    label: 'Ada',
    value: 'ada'
  },
  {
    label: 'Tidak Ada',
    value: 'tidak ada'
  }
]

export const languageOptions = [
  { label: 'Inggris', value: 'inggris' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Jerman', value: 'jerman' },
  { label: 'Mandarin', value: 'mandarin' },
  { label: 'Jepang', value: 'jepang' },
  { label: 'Spanyol', value: 'spanyol' },
  { label: 'Prancis', value: 'prancis' },
  { label: 'Arab', value: 'arab' },
  { label: 'Korea', value: 'korea' },
  { label: 'Rusia', value: 'rusia' },
  { label: 'Italia', value: 'italia' },
  { label: 'Portugis', value: 'portugis' },
  { label: 'Turki', value: 'turki' },
  { label: 'Belanda', value: 'belanda' },
  { label: 'Swedia', value: 'swedia' }
]
