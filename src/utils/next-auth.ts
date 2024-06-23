import type { AuthOptions } from 'next-auth'

import { BASE_URL } from './axios'
import { request } from './request'

import CredentialProvider from 'next-auth/providers/credentials'
import { CODE_OK } from '@/configs/http'

export const AuthOption: AuthOptions = {
  providers: [
    CredentialProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const payload = {
          email,
          password
        }

        try {
          const res = await request({
            url: `${BASE_URL}/login`,
            method: 'POST',
            body: payload
          })

          const result = await res.json()

          if (result?.code === CODE_OK) {
            const data = result?.data

            return data
          }

          return null
        } catch (error) {
          console.error('Authentication Problem : ', error)
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        return {
          ...user,
          ...token
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        return {
          ...session,
          ...token
        }
      }

      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 36 * 60 * 60 * 24
  },
  pages: {
    signIn: '/login'
  }
}
