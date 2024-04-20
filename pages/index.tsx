import React from 'react'

interface ReturnProps {
  redirect: { destination: string; permanent: boolean }
}

export const getServerSideProps = async (): Promise<ReturnProps> => {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }
}

const DefaultPage = (): JSX.Element => <></>

export default DefaultPage
