import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null
      idAdmin?: boolean
    } & DefaultSession['user']
  }

  export interface User extends DefaultUser {
    _id?: string
    isAdmin?: boolean
  }
}
