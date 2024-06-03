import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth/next'
export const config = {
  providers: [
    //it has option like github providers, google providers here we are using credential providers
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect() //connect the database
        if (credentials == null) return null //if there is no payload return null
        const user = await UserModel.findOne({ email: credentials.email })
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return user
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    authorized({ request, auth }: any) {
      //accepts request and aut as parameter
      const protectedPaths = [
        //users need to be authentication in these protected paths
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/, //we use regular expression to authnticate dyname order ID's
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth
      return true
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
